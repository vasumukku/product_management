const { Attribute, AttributeOption } = require("../models");

exports.createAttribute = async (req, res) => {

  try {

    const { name, options } = req.body;

    
    const attribute = await Attribute.create({
      name,
    });

   
    for (let option of options) {

      await AttributeOption.create({
        attributeId: attribute.id,
        value: option,
      });

    }

    res.status(201).json({
      message: "Attribute Created",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};




exports.getAttributes = async (req, res) => {

  try {

    const attributes =
      await Attribute.findAll({

        include: [
          {
            model: AttributeOption,
          },
        ],

      });

    res.status(200).json(
      attributes
    );

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};



exports.getSingleAttribute = async (req, res) => {

  try {

    const attribute = await Attribute.findByPk(req.params.id, {

      include: [
        {
          model: AttributeOption,
        },
      ],

    });

    if (!attribute) {

      return res.status(404).json({
        message: "Attribute not found",
      });

    }

    res.status(200).json(attribute);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};




exports.updateAttribute = async (req, res) => {

  try {

    const { name } = req.body;

    const attribute = await Attribute.findByPk(req.params.id);

    if (!attribute) {

      return res.status(404).json({
        message: "Attribute not found",
      });

    }

    await attribute.update({
      name,
    });

    res.status(200).json({
      message: "Attribute Updated",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};



exports.deleteAttribute = async (req, res) => {

  try {

    const attribute = await Attribute.findByPk(req.params.id);

    if (!attribute) {

      return res.status(404).json({
        message: "Attribute not found",
      });

    }

    // Delete options first
    await AttributeOption.destroy({
      where: {
        attributeId: attribute.id,
      },
    });

    // Delete attribute
    await attribute.destroy();

    res.status(200).json({
      message: "Attribute Deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};