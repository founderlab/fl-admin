# Admin panel for FounderLab apps

Usage: 
    

Changes: 

- 0.4.2: Bugfix in fetchRelated. Option to specify a query to filter which related models will be fetched (called `filter`) 
- 0.4.1: Quill editor is supported. Added the `input` option for form fields. To use quill set it like so: `input: 'rich_text'`
- 0.4.0: Pagination added; field.inline setting renamed to list_edit
- 0.3.0: State shape changes for pagination
- 0.2.0: belongsTo relations can be saved


### Usage:
   
    import admin from 'fl-admin'

    admin({
      models: [
        {
          model_type: require('./models/User'),
          fields: {
            name: {
              list_edit: true,
            },
            email: {
              list_edit: true,
            },
            admin: {
              list_edit: true,
            },
            school: {
              filter: (model_ids, model_store, relation_field) {
                const user = model_store.get('by_id').get(model_ids[0])
                return {city: user.get('city')}
              },
            },
            description: {
              input: 'rich_text',
            },
          },
        },
      ]
    })

###State shape:

    {
      admin: {

        model_one: {
          by_id: {
            1: {
              id: 1,
              name: 'modelone instance',
            },
          },
          pagination: {
            visible: [1],
            current_page: 1,
            endless_page: 1,
          },
          loading: false,
        },

        model_type_two: {
          by_id: {
            565bae416f09bd1840df69dc: {
              id: 565bae416f09bd1840df69dc,
              name: 'model two instance',
            },
          },
          loading: false,
        },

      },
    }
