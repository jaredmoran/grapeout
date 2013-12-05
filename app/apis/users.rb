class Users < Grape::API

  version 'v1', :using => :path
  format :json

  resource 'users' do
    get "/" do
      header "Access-Control-Allow-Origin", "*"

      User.all
    end

    get "/:id" do
      header "Access-Control-Allow-Origin", "*"

      User.find(params['id'])
    end

    post "/create" do
      header "Access-Control-Allow-Origin", "*"

      User.create(params['user'])
    end

    post "/update/:id" do
      header "Access-Control-Allow-Origin", "*"

      user = User.find( params['id'] )
      user.assign_attributes( params['user'] )
      user.save
    end

    post "/delete/:id" do
      header "Access-Control-Allow-Origin", "*"

      User.find( params['id'] ).delete
    end
  end

end