const { Organization } = require('../models')

class OrganizationController {
  static async postOrganization (req, res, next) {
    const {
      name,
      description,
      isPaid,
      price
    } = req.body
    
    try {
      const organization = await Organization.create({
        name, 
        description,
        isPaid,
        price,
        UserId: req.auth.id
      })

      res.status(201).json({
        message: `Your organization already created`,
        organization
      })
    } catch (error) {
      next(error)
    }
  }
  static async getOrganization (req, res, next) {
    try {
      const data = await Organization.findAll({
        where: {
          UserId: req.auth.id
        }
      })

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async putOrganization (req, res, next) {
    const {
      name,
      description,
      isPaid,
      price
    } = req.body
    const { id } = req.params

    try {
      const organization = await Organization.update({
        name, 
        description,
        isPaid,
        price,
        UserId: req.auth.id
      }, 
      {
        where: {
          id,
          UserId: req.auth.id
        },
        attributes: {
          exclude: ["cratedAt", "updatedAt"]
        },
        returning: true
      })
      
      res.status(200).json({
        message: `Organization ${organization[1][0].name} has updated !`,
        organization: organization[1]
      })
    } catch (error) {
      next(error)
    }
  }
  static async deleteOrganization (req, res, next) {
    const { id } = req.params
    const { id: UserId } = req.auth
    
    try {
      await Organization.destroy({
        where: {
          id,
          UserId
        }
      })  

      res.status(200).json({
        message: `Organization has deleted !`
      })
    } catch (error) {
      next(error)
    }
  }
  static async getMember (req, res, next) {
    const { id } = req.params
    const { id: UserId } = req.auth

    try {
      const data = await Organization.findAll({
        where:{
          id,
          UserId
        },
        include: [{
          model: PaymentStatus,
          attributes: {
            exclude: ['updatedAt', 'createdAt']
          }
        }]
      })

      console.log(data);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = OrganizationController