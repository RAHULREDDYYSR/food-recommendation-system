import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true,
    unique: true
  },
  quantity: {
    type: String,
    required: [true, 'Quantity description is required'],
    trim: true
  },
  calories: {
    type: Number,
    required: [true, 'Calorie count is required'],
    min: [0, 'Calories cannot be negative']
  },
  protein: {
    type: Number,
    required: [true, 'Protein content is required'],
    min: [0, 'Protein content cannot be negative']
  },
  fat: {
    type: Number,
    required: [true, 'Fat content is required'],
    min: [0, 'Fat content cannot be negative']
  },
  carbs: {
    type: Number,
    required: [true, 'Carbohydrate content is required'],
    min: [0, 'Carbohydrate content cannot be negative']
  },
  image_link: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  category: {
    type: String,
    enum: ['main course', 'snack', 'dessert', 'breakfast', 'street food'],
    default: 'main course'
  },
  region: {
    type: String,
    enum: ['north', 'south', 'east', 'west', 'nationwide'],
    default: 'nationwide'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual property for total nutrients
foodItemSchema.virtual('total_nutrients').get(function() {
  return this.calories + this.protein + this.fat + this.carbs;
});

// Query helper for filtering by calorie range
foodItemSchema.query.byCalories = function(min, max) {
  return this.where('calories').gte(min).lte(max);
};

// Static method for finding high protein foods
foodItemSchema.statics.highProtein = function(minProtein = 20) {
  return this.find({ protein: { $gte: minProtein } });
};

 export const FoodItems = mongoose.model('FoodItem', foodItemSchema);

