# Admin panel for FounderLab apps

This module will auto generate a full admin site to manage a backend based on Frameworkstein models. You provide the models you want to manage for and it will generate routes and form pages for them.


### Screenshots

##### Homepage
![Home](http://founderlab.github.io/fl-admin/home.png)
Select a model type to edit its data.

##### Model list
![Model list](http://founderlab.github.io/fl-admin/list.png)
Fields can be configured to display and edit on the list page.

##### Model detail
![Model detail](http://founderlab.github.io/fl-admin/detail.png)
Fields can have their inputs configured for the detail page.

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
