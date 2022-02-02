const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const CategoryData = await Category.findAll(
      {
        include: {
          model: Product,
          attributes: ['product_name']
        }
      }
    )
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  };
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: category, through: Category, as: 'location_travellers' }]
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }  
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  router.post('/', async (req, res) => {
    try {
      const CategoryData = await Category.create(req.body);
      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
        category.update(req.body, {
          where: {
            id: req.params.id
          }
        })
        .then(CategoryData => {
          if (!CategoryData[0]) {
            res.status(404).json({message: 'No category found with this id'});
            return;
          }
          res.json(CategoryData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const CategoryData = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!CategoryData) {
        res.status(404).json({ message: 'No Category found with this id!' });
        return;
      }
  
      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
