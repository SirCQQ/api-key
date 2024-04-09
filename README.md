#API-KEY Usage

This is a small test personal project

<Not made to be used>

Auth is *VERY* dumy no crypto no nothing,  

Auth is on api/user
* POST /register
* POST /login
Body
```
    {
        email:string;
        username:string;
        username:string
    }
```

`_id` of the user is used as a `token` in headers

Getting and API-KEY is on api/api-key
* POST /get-token  
Body
```
{
    numberOfTokens:number, // number of tokens for the key
    name:string // key name
}
```
the `response.apiKey.key` is the api key that you need to set under the header to be able to use the "api"
Api key header  `API-KEY=response.apiKey.key`

### API

* GET /api/test

This endpoint requiers the `token` and  `API-KEY` headers to work, after each use it will use an api key use
When it reaches 0 it will not work anymore

### Disclaimer
This is not a piece of software to be used, this is just me messing around and trying to reproduce something saw only, this *NEED*