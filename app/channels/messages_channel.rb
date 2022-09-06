class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_for "messages_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
