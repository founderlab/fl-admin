# Admin panel for FounderLab apps

This module will auto generate a full admin site to manage a backend based on Frameworkstein models. You provide the models you want to manage for and it will generate routes and form pages for them.


### Screenshots

##### Homepage
![Select a model type to edit its data.](http://founderlab.github.io/fl-admin/home.png)

##### Model list
![Fields can be configured to display and edit on the list page.](http://founderlab.github.io/fl-admin/list.png)

##### Model detail
![Fields can have their inputs configured for the detail page.](http://founderlab.github.io/fl-admin/detail.png)


### How it works
You call `configureAdmin` and configure the admin with a list of models. It examines each models fields via its schema and generates form fields to edit them. You can pass in some options to control how these form fields are rendered.

### Example
    import configureAdmin from 'fl-admin'
    import StaticPage from './models/StaticPage'
    import User from './models/User'

    configureAdmin({
      models: [
        {
          Model: StaticPage,
          fields: {
            title: {
              listEdit: true,
            },
            content: {
              input: 'rich',
            },
          },
        },
        {
          Model: User,
          display: model => model.email,
          fields: {
            id: {
              listDisplay: true,
            },
            admin: {
              listDisplay: true,
            },
          },
        },
      ],
    })

### Configuration
There are model-level and field-level configuration options. Models given to configuration functions are plain javascript objects (not instances of the model class).

#### Model configuration options
    Model: (required) The model class

    display: Function that takes a model object and returns a string representation of it. Defaults to `model.name || model.title`
    name: String representation of the model class. Defaults to `Model.modelName || Model.model_name || Model.name`
    display: model => model.name || model.title
    sort: `'id'` | Sorting for list pages
    perPage: `50` | Models to show per list page
    listDelete: `false` | Show a delete button on the list page
    rootPath: `options.rootPath` | 
    path: `table(Model)` | 
    plural: `plural(Model)` | 
    actionType: ``${ACTION_PREFIX}${upper(Model)}`` | 
    readOnlyFields: `['createdDate']` | List of fields that shouldn't be edited
    components: {
      
    },
