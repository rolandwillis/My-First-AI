'use strict'

exports.handle = (client) => {
  // Create steps
  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('welcome')
      client.addResponse('provide/documentation', {
        documentation_link: 'http://docs.init.ai',
      })
      client.addResponse('provide/instructions')

      client.updateConversationState({
        helloSent: true
      })

      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('apology/untrained')
      client.done()
    }
  })
  
  client.getEntities(client.getMessagePart(), 'opponent')

// Returns
{
  name: [
    {
      value: 'dodgers',
      raw_value: 'dodgers',
      parsed: null
    },
    {
      value: 'indians',
      raw_value: 'indians',
      parsed: null
    },
  ],
  city: [
    {
      value: 'los angeles',
      raw_value: 'los angeles',
      parsed: null
    },
    {
      value: 'cleveland',
      raw_value: 'cleveland',
      parsed: null
    },
  ],

}

  client.runFlow({
    classifications: {
      // map inbound message classifications to names of streams
    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
      main: 'onboarding',
      onboarding: [sayHello],
      end: [untrained],
    },
  })
}
