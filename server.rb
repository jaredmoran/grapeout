require "rubygems"
require "bundler/setup"
require 'goliath'
require 'em-synchrony/activerecord'
require 'grape'
require './app/apis/users'
require './app/models/user'

class Application < Goliath::API

  def response(env)
    ::Users.call(env)
  end

end