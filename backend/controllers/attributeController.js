const db = require("../models");

const Attribute = db.Attribute;

const AttributeOption = db.AttributeOption;



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

    const attributes = await Attribute.findAll({

      include: [
        {
          model: AttributeOption,
        },
      ],
    });

    res.status(200).json(attributes);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};