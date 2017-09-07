# Admin panel for FounderLab apps

This module will auto generate a full admin site to manage a backend based on Frameworkstein models. You provide the models you want to manage for and it will generate routes and form pages for them.


### Screenshots

##### Homepage
![Select a model type to edit its data.](http://founderlab.github.io/fl-admin/home.png)

##### Model list
![Fields can be configured to display and edit on the list page.](http://founderlab.github.io/fl-admin/list.png)

##### Model detail
![Fields can have their inputs configured for the detail page.](http://founderlab.github.io/fl-admin/detail.png)


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
