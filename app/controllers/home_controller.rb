class HomeController < ApplicationController
  def index
  	msg_list = [
  		{   "id" => 1 , 
  			"user_id" => 10 , 
  			"body" => "hello world", 
  			"user_fname" => "Hsin", 
  			"created_at" =>  (Time.now - 1700).strftime('%a %b %d %H:%M') },
  			{   "id" => 2 , 
  			"user_id" => 12 , 
  			"body" => "how are you", 
  			"user_fname" => "Chris", 
  			"created_at" =>  (Time.now - 1600).strftime('%a %b %d %H:%M') },
  			{   "id" => 1 , 
  			"user_id" => 10 , 
  			"body" => "good, how're you?", 
  			"user_fname" => "Hsin", 
  			"created_at" =>  (Time.now - 1500).strftime('%a %b %d %H:%M') },
  			{   "id" => 2 , 
  			"user_id" => 12 , 
  			"body" => "let's grab a drink", 
  			"user_fname" => "Hsin", 
  			"created_at" =>  (Time.now - 1400).strftime('%a %b %d %H:%M') },
  	]
  	@messages = msg_list.to_json
  end
end
