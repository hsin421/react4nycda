class HomeController < ApplicationController
  def index
  	msg_list = [
  		{   "id" => 1 , 
  			"user_id" => 10 , 
  			"group_id" => 5, 
  			"body" => "hello world", 
  			"updated_at" => (Time.now - 1700).strftime('%a %b %d %H:%M') ,
  			"user_fname" => "Hsin", 
  			"created_at" =>  (Time.now - 1700).strftime('%a %b %d %H:%M') },
  			{   "id" => 2 , 
  			"user_id" => 12 , 
  			"group_id" => 5, 
  			"body" => "how are you", 
  			"updated_at" => (Time.now - 1600).strftime('%a %b %d %H:%M') ,
  			"user_fname" => "Chris", 
  			"created_at" =>  (Time.now - 1600).strftime('%a %b %d %H:%M') },
  			{   "id" => 1 , 
  			"user_id" => 10 , 
  			"group_id" => 5, 
  			"body" => "good, how're you?", 
  			"updated_at" => (Time.now - 1500).strftime('%a %b %d %H:%M') ,
  			"user_fname" => "Hsin", 
  			"created_at" =>  (Time.now - 1500).strftime('%a %b %d %H:%M') },
  			{   "id" => 2 , 
  			"user_id" => 12 , 
  			"group_id" => 5, 
  			"body" => "let's grab a drink", 
  			"updated_at" => (Time.now - 1400).strftime('%a %b %d %H:%M') ,
  			"user_fname" => "Hsin", 
  			"created_at" =>  (Time.now - 1400).strftime('%a %b %d %H:%M') },
  	]
  	@messages = msg_list.to_json
  end
end
