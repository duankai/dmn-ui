# Fake Server API

## GET /networks

Returns a list of available networks

```json
[{
  "name": "Network 1",
  "id": 1
}, {
  ...
}]
```

## GET /networks/:network/models

Returns a list of available models for the specified network

```json
[{
  "name": "Model 1 of Network 1",
  "id": 1,
  "description": "Some description",
  "vocab": ["John", "table", "football", ...],
  "samples": [{
    "C": "some story",
    "Q": "some question?"
  }, ...],
  "hyper_param1": 1,
  ...
}, {
  ...
}]
```

## POST /networks/:network/models/:model/_predict

Predicts the answer for the specified story and question

### Input
```json
{
  "story": "some story",
  "question": "Where is football?"
}
```

### Output

Explanation:
  * answer: the actual answer
  * confidence: confidence of the predicted answer
  * facts: array of extracted facts
  * episodes: 2-dimensional array of episodes and attention values for each episode 

```json
{
  "answer": "kitchen",
  "confidence": "0.99999123",
  "facts": ["fact1", "fact2", ... ],
  "episodes": [
    [0, 0.5, ...],
    [1, 0, ...],
    ...
  ]
}
```