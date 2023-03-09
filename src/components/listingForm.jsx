import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import CategoriesSelect from './categoriesSelect';
import { apiCallBegan } from './../store/api';
import { connect } from 'react-redux';
import { withRouter } from '../components/common/withRoute';

const Joi = require('joi-browser');

class ListingForm extends Component {
  categories = {
    Women: {
      Accessories: [
        'Belts',
        'Face Masks',
        'Glasses',
        'Gloves & Mittens',
        'Hair Accessories',
        'Hats',
        'Hosiery & Socks',
        'Key & Card Holders',
        'Laptop Cases',
        'Phone Cases',
        'Scarves & Wraps',
        'Sunglasses',
        'Tablet Cases',
        'Umbrellas',
        'Watches',
        'None',
      ],
      Bags: [
        'Baby Bags',
        'Backpacks',
        'Clutches & Wristlets',
        'Cosmetic Bags & Cases',
        'Crossbody Bags',
        'Hobos',
        'Laptop Bags',
        'Mini Bags',
        'Satchels',
        'Shoulder Bags',
        'Totes',
        'Travel Bags',
        'Wallets',
        'None',
      ],
      Dresses: [
        'Asymmetrical',
        'Backless',
        'High Low',
        'Long Sleeve',
        'Maxi',
        'Midi',
        'Mini',
        'One Shoulder',
        'Prom',
        'Strapless',
        'Wedding',
        'None',
      ],
      'Intimates & Sleepware': [
        'Bandeaus',
        'Bras',
        'Chemises & Slips',
        'Pijamas',
        'Panties',
        'Robes',
        'Shapewear',
        'Sports Bras',
        'None',
      ],
      'Jackets & Coats': [
        'Blazers & Suit Jackets',
        'Bomber Jackets',
        'Capes',
        'Jean Jackets',
        'Leather Jackets',
        'Pea Coats',
        'Puffers',
        'Ski & Snow Jackets',
        'Teddy Jackets',
        'Trench Coats',
        'Utility Jackets',
        'Varsity Jackets',
        'Vests',
        'None',
      ],
      Jeans: [
        'Ankle & Cropped',
        'Boot Cut',
        'Boyfriend',
        'Flare & Wide Leg',
        'High Rise',
        'Jeggings',
        'Overalls',
        'Skinny',
        'Straight Leg',
        'None',
      ],
      Jewelry: [
        'Bracelets',
        'Brooches',
        'Earrings',
        'Necklaces',
        'Rings',
        'None',
      ],
      Makeup: [
        'Blush',
        'Bronzer & Contour',
        'Brows',
        'Brushes & Tools',
        'Concealer',
        'Eye Primer',
        'Eyeliner',
        'Eyeshadow',
        'Foundation',
        'Highlighter',
        'Lashes',
        'Lip Balm & Gloss',
        'Lip Liner',
        'Lipstick',
        'Mascara',
        'Nail Tools',
        'Press-On Nails',
        'Primer',
        'Setting Powder & Spray',
        'None',
      ],
      'Pants & Jumpsuits': [
        'Ankle & Cropped',
        'Boot Cut & Flare',
        'Capris',
        'Jumpsuits & Rompers',
        'Leggings',
        'Pantsuits',
        'Skinny',
        'Straight Leg',
        'Track Pants & Joggers',
        'Trousers',
        'Wide Leg',
        'None',
      ],
      Shoes: [
        'Ankle Boots & Booties',
        'Athletic Shoes',
        'Combat & Moto Boots',
        'Espadrilles',
        'Flats & Loafers',
        'Heeled Boots',
        'Heels',
        'Lace Up Boots',
        'Moccasins',
        'Mules & Clogs',
        'Over the Knee Boots',
        'Platforms',
        'Sandals',
        'Slippers',
        'Sneakers',
        'Wedges',
        'Winter & Rain Boots',
        'None',
      ],
      Shorts: [
        'Athletic Shorts',
        'Bermudas',
        'Bike Shorts',
        'Cargos',
        'High Waist',
        'Jean Shorts',
        'Skorts',
        'None',
      ],
      Skirts: [
        'A-Line or Full',
        'Asymmetrical',
        'Circle & Skater',
        'High Low',
        'Maxi',
        'Midi',
        'Mini',
        'Pencil',
        'Skirt Sets',
        'None',
      ],
      Sweaters: [
        'Cardigans',
        'Cowl & Turtlenecks',
        'Crew & Scoop Necks',
        'Off-the-Shoulder Sweaters',
        'Shrugs & Ponchos',
        'V-Necks',
        'None',
      ],
      Swim: ['Bikinis', 'Coverups', 'One Pieces', 'Sarongs', 'None'],
      Tops: [
        'Blouses',
        'Bodysuits',
        'Button Down Shirts',
        'Camisoles',
        'Crop Tops',
        'Jerseys',
        'Muscle Tees',
        'Sweatshirts & Hoodies',
        'Tank Tops',
        'Tees - Long Sleeve',
        'Tees - Short Sleeve',
        'Tunics',
        'None',
      ],
      Skincare: [
        'Acne & Blemish',
        'Cleanser & Exfoliant',
        'Eye Cream',
        'Makeup Remover',
        'Mask',
        'Moisturizer',
        'Peel',
        'Serum & Face Oil',
        'Suncare',
        'Toner',
        'Tools',
        'None',
      ],
      Hair: [
        'Color',
        'Conditioner',
        'Hairspray',
        'Heat Protectant',
        'Shampoo',
        'Styling',
        'Tools',
        'Treatment & Mask',
        'Wigs & Extensions',
        'None',
      ],
      'Bath & Body': [
        'Bath Soak & Bubbles',
        'Body Wash',
        'Exfoliant & Scrub',
        'Hair Removal',
        'Hand & Foot Care',
        'Hand Soap',
        'Moisturizer & Body Oil',
        'Suncare & Tanning',
        'Tools',
        'None',
      ],
      Other: ['None'],
    },
    Men: {
      Accessories: [
        'Belts',
        'Cuff Links',
        'Face Masks',
        'Glasses',
        'Gloves',
        'Hats',
        'Jewelry',
        'Key & Card Holders',
        'Money Clips',
        'Phone Cases',
        'Pocket Squares',
        'Scarves',
        'Sunglasses',
        'Suspenders',
        'Ties',
        'Watches',
        'None',
      ],
      Bags: [
        'Backpacks',
        'Belt Bags',
        'Briefcases',
        'Duffel Bags',
        'Laptop Bags',
        'Luggage & Travel Bags',
        'Messenger Bags',
        'Toiletry Bags',
        'Wallets',
        'None',
      ],
      'Jackets & Coats': [
        'Bomber & Varsity',
        'Lightweight & Shirt Jackets',
        'Military & Field',
        'Pea Coats',
        'Performance Jackets',
        'Puffers',
        'Raincoats',
        'Ski & Snowboard',
        'Trench Coats',
        'Vests',
        'Windbreakers',
        'None',
      ],
      Jeans: [
        'Bootcut',
        'Relaxed',
        'Skinny',
        'Slim',
        'Slim Straight',
        'Straight',
        'None',
      ],
      Pants: [
        'Cargo',
        'Chinos & Khakis',
        'Corduroy',
        'Dress',
        'Sweatpants & Joggers',
        'None',
      ],
      Shirts: [
        'Casual Button Down Shirts',
        'Dress Shirts',
        'Jerseys',
        'Polos',
        'Sweatshirts & Hoodies',
        'Tank Tops',
        'Tees - Long Sleeve',
        'Tees - Short Sleeve',
        'None',
      ],
      Shoes: [
        'Athletic Shoes',
        'Boat Shoes',
        'Boots',
        'Chukka Boots',
        'Cowboy & Western Boots',
        'Loafers & Slip-Ons',
        'Oxfords & Derbys',
        'Rain & Snow Boots',
        'Sandals & Flip-Flops',
        'Sneakers',
        'None',
      ],
      Shorts: [
        'Athletic',
        'Cargo',
        'Flat Front',
        'Hybrids',
        'Jean Shorts',
        'None',
      ],
      'Suits & Blazers': [
        'Sport Coats & Blazers',
        'Suits',
        'Tuxedos',
        'Vests',
        'None',
      ],
      Sweaters: [
        'Cardigan',
        'Crewneck',
        'Turtleneck',
        'V-Neck',
        'Zip Up',
        'None',
      ],
      Swim: ['Board Shorts', 'Hybrids', 'Rash Guards', 'Swim Trunks', 'None'],
      'Underware & Socks': [
        'Athletic Socks',
        'Boxer Briefs',
        'Boxers',
        'Briefs',
        'Casual Socks',
        'Dress Socks',
        'Undershirts',
        'None',
      ],
      Grooming: [
        'Cleanser',
        'Grooming Tools',
        'Hair Care',
        'Moisturizer',
        'Shaving',
        'Suncare',
        'Treatments',
        'None',
      ],
      Other: ['None'],
    },
    Kids: {
      Accessories: [
        'Bags',
        'Belts',
        'Bibs',
        'Diaper Covers',
        'Face Masks',
        'Hair Accessories',
        'Hats',
        'Jewelry',
        'Mittens',
        'Socks & Tights',
        'Sunglasses',
        'Suspenders',
        'Ties',
        'Underwear',
        'Watches',
        'None',
      ],
      Bottoms: [
        'Casual',
        'Formal',
        'Jeans',
        'Jumpsuits & Rompers',
        'Leggings',
        'Overalls',
        'Shorts',
        'Skirts',
        'Skorts',
        'Sweatpants & Joggers',
        'None',
      ],
      Dresses: ['Casual', 'Formal', 'None'],
      'Jackets & Coats': [
        'Blazers',
        'Capes',
        'Jean Jackets',
        'Pea Coats',
        'Puffers',
        'Raincoats',
        'Vests',
        'None',
      ],
      'Matching Sets': ['None'],
      'One Pieces': ['Bodysuits', 'Footies', 'None'],
      Pajamas: [
        'Nightgowns',
        'Pajama Bottoms',
        'Pajama Sets',
        'Pajama Tops',
        'Robes',
        'Sleep Sacks',
        'None',
      ],
      'Shirts & Tops': [
        'Blouses',
        'Button Down Shirts',
        'Camisoles',
        'Jerseys',
        'Polos',
        'Sweaters',
        'Sweatshirts & Hoodies',
        'Tank Tops',
        'Tees - Long Sleeve',
        'Tees - Short Sleeve',
        'None',
      ],
      Shoes: [
        'Baby & Walker',
        'Boots',
        'Dress Shoes',
        'Moccasins',
        'Rain & Snow Boots',
        'Sandals & Flip Flops',
        'Slippers',
        'Sneakers',
        'Water Shoes',
        'None',
      ],
      Swim: [
        'Bikinis',
        'Coverups',
        'One Piece',
        'Rashguards',
        'Swim Trunks',
        'None',
      ],
      Costumes: [
        'Dance',
        'Halloween',
        'Seasonal',
        'Superhero',
        'Theater',
        'None',
      ],
      'Bath, Skin & Hair': [
        'Bath & Body',
        'Hair Care',
        'Moisturizer',
        'Suncare',
        'Tools',
        'None',
      ],
      Toys: [
        'Action Figures & Playsets',
        'Building Sets & Blocks',
        'Cars & Vehicles',
        'Dolls & Accessories',
        'Learning Toys',
        'Puzzles & Games',
        'Stuffed Animals',
        'Trading Cards',
        'None',
      ],
      Other: ['None'],
    },
    Home: {
      Accents: [
        'Accent Pillows',
        'Baskets & Bins',
        'Candles & Holders',
        'Coffee Table Books',
        'Curtains & Drapes',
        'Decor',
        'Door Mats',
        'Faux Florals',
        'Furniture Covers',
        'Lanterns',
        'Picture Frames',
        'Vases',
        'None',
      ],
      Bath: [
        'Bath Accessories',
        'Bath Storage',
        'Bath Towels',
        'Beach Towels',
        'Hand Towels',
        'Mats',
        'Shower Curtains',
        'Vanity Mirrors',
        'Vanity Trays',
        'Wash Cloths',
        'None',
      ],
      Bedding: [
        'Blankets & Throws',
        'Comforters',
        'Duvet Covers',
        'Mattress Covers',
        'Pillows',
        'Quilts',
        'Sheets',
        'None',
      ],
      Dining: [
        'Bar Accessories',
        'Dinnerware',
        'Drinkware',
        'Flatware',
        'Mugs',
        'Serveware',
        'Serving Utensils',
        'Table Linens',
        'Water Bottles & Thermoses',
        'None',
      ],
      Games: ['Card Games', 'Outdoor Games', 'Puzzles', 'None'],
      Holiday: [
        'Garland',
        'Blouses',
        'Button Down Shirts',
        'Camisoles',
        'Jerseys',
        'Polos',
        'Sweaters',
        'Sweatshirts & Hoodies',
        'Tank Tops',
        'Tees - Long Sleeve',
        'Tees - Short Sleeve',
        'None',
      ],
      Kitchen: [
        'BBQ & Grilling Tools',
        'Bakeware',
        'Coffee & Tea Accessories',
        'Cookbooks',
        'Cooking Utensils',
        'Cookware',
        'Food Storage',
        'Kitchen Linens',
        'Kitchen Tools',
        'Knives & Cutlery',
        'None',
      ],
      Office: [
        'Arts & Crafts',
        'Binders & Folders',
        'Calendars',
        'Labels & Label Makers',
        'Notebooks & Journals',
        'Pencil Cases',
        'Planners',
        'Shipping Supplies',
        'Stationery',
        'None',
      ],
      'Party Supplies': [
        'Cake Candles',
        'Cake Toppers',
        'Cards & Invitations',
        'Decorations',
        'Disposable Tableware',
        'Favors',
        'Gift Wrap',
        'Hats',
        'Party Lights',
        'None',
      ],
      'Storage & Organization': [
        'Closet Accessories',
        'Drawer Liners',
        'Garment Bags',
        'Jewelry Organizers',
        'Makeup Organizers',
        'Storage',
        'None',
      ],
      'Wall Art': [
        'Art & Decals',
        'Clocks',
        'Display Shelves',
        'Hooks',
        'Mirrors',
        'Tapestries',
        'Wallpaper',
        'None',
      ],
      Other: ['None'],
    },
    Pets: {
      Dog: [
        'Bedding & Blankets',
        'Bowls & Feeders',
        'Carriers & Travel',
        'Clothing & Accessories',
        'Collars, Leashes & Harnesses',
        'Grooming',
        'Housebreaking',
        'Toys',
        'None',
      ],
      Cat: [
        'Beds',
        'Bowls & Feeders',
        'Carriers & Travel',
        'Clothing & Accessories',
        'Collars, Leashes  & Harnesses',
        'Grooming',
        'Scratchers',
        'Toys',
        'None',
      ],
      Bird: [
        'Cages & Covers',
        'Feeders & Waterers',
        'Perches & Swings',
        'Toys',
        'None',
      ],
      Fish: [
        'Aquarium Kits',
        'Cleaning & Maintenance',
        'Decor & Accessories',
        'None',
      ],
      Reptile: [
        'Cleaning & Maintenance',
        'Habitats',
        'Habitat Accessories',
        'Heating & Lights',
        'None',
      ],
      'Small Pets': [
        'Bedding',
        'Bowls & Feeders',
        'Cages & Habitats',
        'Carriers',
        'Grooming',
        'Habitat Accessories',
        'Toys',
        'None',
      ],
      Other: ['None'],
    },
  };
  state = {
    newListing: {
      title: '',
      size: '',
      brand: '',
      original_price: '',
      listing_price: '',
      lowest_price: '200',
      description: '',
      category: '',
      secondaryCategory: '',
      subcategory: '',
      cover_photo_value: '',
      cover_photo: [],
      other_photos_value: '',
      other_photos: [],
    },
    categoryOptions: [
      {
        name: 'Category',
        items: ['Select an option', 'Women', 'Men', 'Kids', 'Home', 'Pets'],
      },
      { name: 'Secondary Category', items: ['Select an option'] },
      { name: 'Sub Category', items: ['Select an option'] },
    ],
    validated: false,
    errors: {},
  };
  schema = {
    title: Joi.string().max(80).required().label('Title'),
    size: Joi.string().max(20).required().label('Size'),
    brand: Joi.string().max(30).label('Brand'),
    category: Joi.string().max(30).required().label('Category'),
    secondaryCategory: Joi.string()
      .max(30)
      .required()
      .label('Secondary Category'),
    subcategory: Joi.string().max(30).required().label('Sub Category'),
    original_price: Joi.number().min(50).required().label('Original Price'),
    listing_price: Joi.number().min(25).required().label('Listing Price'),
    lowest_price: Joi.number().min(15).required().label('Lowest Price'),
    description: Joi.any().required().label('Description'),
    cover_photo: Joi.any().required(),
    other_photos: Joi.any().required(),
    cover_photo_value: Joi.any(),
    other_photos_value: Joi.any(),
  };

  constructor() {
    super();
    this.navigateToListings = this.navigateToListings.bind(this);
  }

  navigateToListings = () => {
    this.props.navigate('/listings');
  };

  getCategoryAndIndex = (
    categoryOptions,
    name,
    propertyName,
    propertyValue
  ) => {
    const index = categoryOptions.findIndex(
      (categoryOption) => categoryOption.name === name
    );
    let categoryOption = { ...categoryOptions[index] };
    categoryOption[propertyName] = propertyValue;

    return { index, categoryOption };
  };

  handleSelect = ({ target: select }) => {
    const { value, name } = select;
    const values = {
      Category: 'category',
      'Secondary Category': 'secondaryCategory',
      'Sub Category': 'subcategory',
    };
    let { categoryOptions, newListing } = this.state;
    newListing[values[name]] = value;

    if (name === 'Category') {
      const items = Object.keys(this.categories[value]);
      items.unshift('Select an option');
      const { index: nextCategoryIndex, categoryOption: nextCategoryOption } =
        this.getCategoryAndIndex(
          categoryOptions,
          'Secondary Category',
          'items',
          items
        );
      const { index: lastCategoryIndex, categoryOption: lastCategoryOption } =
        this.getCategoryAndIndex(categoryOptions, 'Sub Category', 'value', '');
      newListing.secondaryCategory = '';
      categoryOptions[nextCategoryIndex] = nextCategoryOption;
      categoryOptions[lastCategoryIndex] = lastCategoryOption;
    } else if (name === 'Secondary Category') {
      const items = this.categories[newListing.category][value];
      items.unshift('Select an option');
      const { index: nextCategoryIndex, categoryOption: nextCategoryOption } =
        this.getCategoryAndIndex(
          categoryOptions,
          'Sub Category',
          'items',
          items
        );
      newListing.subcategory = '';
      categoryOptions[nextCategoryIndex] = nextCategoryOption;
    }
    this.setState({ categoryOptions, newListing });
  };

  transformToFormData(newListing) {
    newListing.category = `${newListing.category} ${newListing.secondaryCategory}`;
    delete newListing.cover_photo_value;
    delete newListing.other_photos_value;
    delete newListing.secondaryCategory;
    const keys = Object.keys(newListing);
    let formData = new FormData();
    keys.forEach((key) => {
      if (key === 'cover_photo') {
        formData.append(key, newListing.cover_photo[0]);
      } else if (key === 'other_photos') {
        for (let i = 0; i < newListing.other_photos.length; i++) {
          formData.append(`other_image_${i}`, newListing.other_photos[i]);
        }
      } else {
        formData.append(key, newListing[key]);
      }
    });

    return formData;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    form.checkValidity();
    const errors = this.validate();
    const validated = errors ? false : true;

    this.setState({ validated, errors });
    if (validated) {
      let { newListing } = this.state;
      const formData = this.transformToFormData(newListing);

      this.props.listingAdded(formData);
      this.navigateToListings();
      this.setState({
        newListing: {
          title: '',
          size: '',
          brand: '',
          original_price: '',
          listing_price: '',
          lowest_price: '200',
          description: '',
          category: '',
          secondaryCategory: '',
          subcategory: '',
          cover_photo_value: '',
          cover_photo: [],
          other_photos_value: '',
          other_photos: [],
        },
        errors: {},
      });
    }
  };

  validate = () => {
    const result = Joi.validate(this.state.newListing, this.schema, {
      abortEarly: false,
    });

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const newListing = { ...this.state.newListing };

    newListing[input.name] = input.value;

    this.setState({ newListing });
  };

  handleFileChange = (event) => {
    let { newListing } = this.state;
    const { name, files, value } = event.target;
    for (let i = 0; i < files.length; i++) {
      newListing[name].push(files[i]);
    }
    newListing[`${name}_value`] = value;
    this.setState(newListing);
  };

  render() {
    const { newListing, errors, categoryOptions } = this.state;
    return (
      <Form id="listingForm" onSubmit={this.handleSubmit} validated={false}>
        <Row className="mb-3">
          <Col>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              maxLength="50"
              value={newListing.title}
              onChange={this.handleChange}
              isInvalid={errors.title ? true : false}
              required
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Cover Photo</Form.Label>
            <Form.Control
              type="file"
              onChange={this.handleFileChange}
              accept="image/*"
              name="cover_photo"
              value={newListing.cover_photo_value}
              required
            />
          </Col>
          <Col>
            <Form.Label>Other Photos</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={this.handleFileChange}
              accept="image/*"
              value={newListing.other_photos_value}
              name="other_photos"
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              name="size"
              maxLength="20"
              onChange={this.handleChange}
              required
              value={newListing.size}
              isInvalid={errors.size ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.size}
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              maxLength="30"
              onChange={this.handleChange}
              required
              value={newListing.brand}
              isInvalid={errors.brand ? true : false}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <CategoriesSelect
            categoryOptions={categoryOptions}
            onSelect={this.handleSelect}
            newListing={newListing}
            errors={errors}
          />
        </Row>
        <Row className="mb-3">
          <Col xs={12} md={4}>
            <Form.Label>Original Price</Form.Label>
            <Form.Control
              type="number"
              name="original_price"
              onChange={this.handleChange}
              min="50"
              required
              value={newListing.original_price}
              isInvalid={errors.original_price ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.original_price}
            </Form.Control.Feedback>
          </Col>
          <Col xs={12} md={4}>
            <Form.Label>Listing Price</Form.Label>
            <Form.Control
              type="number"
              min="25"
              name="listing_price"
              onChange={this.handleChange}
              required
              value={newListing.listing_price}
              isInvalid={errors.listing_price ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.listing_price}
            </Form.Control.Feedback>
          </Col>
          <Col xs={12} md={4}>
            <Form.Label>Lowest Price</Form.Label>
            <Form.Control
              type="number"
              min="15"
              name="lowest_price"
              onChange={this.handleChange}
              required
              value={newListing.lowest_price}
              isInvalid={errors.lowest_price ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lowest_price}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              onChange={this.handleChange}
              required
              style={{ minHeight: '16em' }}
              value={newListing.description}
              isInvalid={errors.description ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  listingAdded: (payload) => {
    dispatch(
      apiCallBegan({
        url: '/listings/',
        method: 'POST',
        data: payload,
        onSuccess: 'listings/added',
      })
    );
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListingForm)
);
