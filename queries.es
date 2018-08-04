DELETE /myindex 
{
  
}

GET myindex/mytype/_search 
{
  "query": {
    "match_all": {}
  }
}

GET myindex/mytype/_search
{
  "query": {
    "term": {
      "_id": {
        "value": "333179"
      }
    }
  }
}

GET myindex/mytype/_search
{
  "suggest": {
    "nameSuggester": {
      "prefix": "Cell",
      "completion": {
        "field": "name",
        "size": 10,
        "fuzzy": {
          "fuzziness": "auto"
        }
      }
    }
  }
}

GET /myindex/mytype
{
  "name-suggest": {
    "prefix": "from",
    "completion": {
      "field": "nameSuggest"
    }
  }
}

PUT /myindex




PUT /myindex/mytype/_mapping
{
  "mytype": {
    "properties": {
      "name": {
        "type": "completion",
         "analyzer": "simple",
         "search_analyzer": "simple"

        
      }
    }
  }
}