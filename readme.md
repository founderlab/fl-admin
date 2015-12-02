# Admin panel for FounderLab apps

Usage: 
    

Changes: 

- 0.3.0: State shape changes for pagination
- 0.2.0: belongsTo relations can be saved

 
State shape:

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
