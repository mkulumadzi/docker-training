require 'bundler'; Bundler.require
require 'sinatra'

MONGO_URL = ENV['MONGO_URL'] || '127.0.0.1:27017'

configure do
  set :bind, '0.0.0.0'
  set :port, 3000
  db = Mongo::Client.new([MONGO_URL], database: 'test')
  set :mongo_db, db
end

get '/hello-world' do
   "Hello world!"
   #"Hello, #{params[:name]}".strip
end

post '/ideas' do
  content_type :json
  coll = settings.mongo_db['ideas']
  idea = JSON.parse( request.body.read )['idea']
  result = coll.insert_one idea
  coll.find(_id: result.inserted_id).to_a.first.to_json
end

get '/ideas' do
  content_type :json
  settings.mongo_db['ideas'].find.to_a.to_json
end
