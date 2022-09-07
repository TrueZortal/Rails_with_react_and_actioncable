class MessagesController < ApplicationController
  def index
    # p headers
    messages = Message.all
    render json: messages
  end

  def create
    # p headers
    message = Message.new(message_params)
    if message.save
      ActionCable.server.broadcast 'messages_channel', message
      head :ok
    else
      head :ok
    end
  end

  def reset
    message = "delete_all"
    Message.destroy_all
    ActionCable.server.broadcast 'messages_channel', message
    head :ok
  end
  private

  def message_params
    params.require(:message).permit(:content)
  end
end
