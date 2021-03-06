export class DmnController {
  constructor($scope, Networks) {
    'ngInject';

    this.$ = $scope;

    this.busy            = false;
    this.wordsNotInVocab = [];

    Networks.getList()
      .then((networks) => {
        this.networks = networks;
        this.selectNetwork(networks[0]);
      });
  }

  selectNetwork(network) {
    this.network = network;

    this.model = this.vocab = this.vocabStr = this.vocabMap = null;

    return network.all('models').getList()
      .then((models) => {
        this.models = models;
        this.selectModel(models[0]);
      });
  }

  selectModel(model) {
    this.model = model;

    return this.model.get()
      .then((model) => {
        this.modelEx = model;

        this.hyperparams = _.omit(model.plain(), ['name', 'description', 'vocab', 'load_state', 'samples']);

        this.vocabMap = new Map();
        this.vocab    = model.vocab;
        this.vocabStr = model.vocab.join(' ');
        this.vocab.forEach((word) => {
          this.vocabMap.set(word, 0);
        });
      });
  }

  getNumber(n) {
    return new Array(n);
  }

  isMax(episodeIdx, factIdx) {
    const factAttention = this.prediction.episodes[episodeIdx][factIdx];

    return Math.max.apply(Math, this.prediction.episodes[episodeIdx]) === factAttention;
  }

  getColor(attention) {
    return {'background-color': `rgba(0, 192, 247, ${attention})`};
  }

  predict(form) {
    if (form.$invalid || this.busy) {
      return false;
    }

    this.busy = true;

    return this.model.one('_predict').customPOST({story: this.story, question: this.question})
      .then((prediction) => {
        this.prediction = prediction;
      })
      .finally(() => {
        this.busy = false;
      });
  }

  getSample() {
    if (!this.modelEx.samples) {
      return;
    }

    const sample = this.modelEx.samples[Math.floor(Math.random() * this.modelEx.samples.length)];

    this.story    = sample.C;
    this.question = sample.Q;

    return this.predict(this.$.dmnForm);
  }
}
