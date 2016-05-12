# Admin panel for FounderLab apps

### Usage:
   
    import admin from 'fl-admin'

    admin({
      models: [
        {
          Model: require('./models/User'),
          fields: {
            name: {
              listEdit: true,
            },
            email: {
              listEdit: true,
            },
            admin: {
              listEdit: true,
            },
            school: {
              filter: (modelIds, modelStore, relationField) {
                const user = modelStore.get('models').get(modelIds[0])
                return {city: user.get('city')}
              },
            },
            description: {
              input: 'rich',
            },
          },
        },
      ]
    })

###State shape:

    {
      admin: {

        modelOne: {
          models: {
            1: {
              id: 1,
              name: 'modelone instance',
            },
          },
          pagination: {
            visible: [1],
            currentPage: 1,
            endlessPage: 1,
          },
          loading: false,
        },

        modelTypeTwo: {
          models: {
            565bae416f09bd1840df69dc: {
              id: 565bae416f09bd1840df69dc,
              name: 'model two instance',
            },
          },
          loading: false,
        },

      },
    }
