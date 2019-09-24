# Mirko Bot

Mirko is a completely free, made for fun chatbot made with Discord.js library.
It uses PostgreSQL database for storing stats about memes and gifs (optional). 

## Usage

Clone the repo and add .env file with your bot token and api keys for features that you want to use.

.env file example:

```ruby
BOT_TOKEN = ***

DATABASE_URL = postgres://...

PGDATABASE = ...

PGHOST = ...

PGPASSWORD = ...

PGPORT = 5432

PGUSER = ...

WEATHER_API_KEY = ...

...
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Source code
Add additional actions in messageChannel.js file like the others and add routes and help attributes to your controller. That way channel knows which routes to use. 


## License
[wtfpl](http://www.wtfpl.net)
