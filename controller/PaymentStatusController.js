const { PaymentStatus, User, Organization } = require('../models')
const stripe = require('../apis/stripe')

class PaymentStatusController {
  static async assignUser (req, res, next) {
    const { email, OrganizationId } = req.body
    try {
      const findUser = await User.findOne({
        where: {
          email
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"]
        }
      })
      if ( !findUser) throw { name: "USER_NOT_FOUND" }

      const findOrgs = await Organization.findOne({
        where: {
          id: OrganizationId
        }
      })
      if ( !findOrgs ) throw { name: "ORGANIZATION_FAIL" }

      const findPayment = await PaymentStatus.findOne({
        where: {
          UserId: findUser.id,
          OrganizationId: findOrgs.id
        }
      })
      if ( findPayment ) throw { name: "HAVE_A_PAYMENT" }

      // input data to DB
      await PaymentStatus.create({
        UserId: findUser.id,
        OrganizationId
      })

      res.status(201).json({
        message: `${email} already assign to ${findOrgs.name}`,
      })
    } catch (error) {
      next(error)
    }
  }
  
  static async getPaymentByUserId (req, res, next) {
    const { UserId } = req.params
    try {
      const data = await PaymentStatus.findAll({
        include: [{
          model: User,
          attributes: {
            exclude: ["updatedAt", "createdAt", "password"]
          }
        }, {
          model: Organization,
          include: [{
            model: User,
            attributes: {
              exclude: ["updatedAt", "createdAt", "password"]
            }
          }],
          attributes: {
            exclude: ["updatedAt", "createdAt"]
          }
        }],
        where: {
          UserId
        },
        attributes: {
          exclude: ["updatedAt", "createdAt"]
        }
      })
      if ( !data ) throw { name: "NOT_FOUND" }
      
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async paymentProcess (req, res, next) {
    try {
      console.log(req.body)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: req.body.stripe,
        success_url: `${process.env.CLIENT_URL}/payment?success=true&paymentId=${req.body.idPayment}`,
        cancel_url: `${process.env.CLIENT_URL}/payment?success=false`
      })
      
      res.json({
        url: session.url
      })
    } catch (error) {
      next(error)
    }
  }

  static async successPayment (req, res, next) {
    const { id } = req.body

    try {
      await PaymentStatus.update({
        status: 'paid'
      }, {
        where: {
          id
        }
      })
      
      res.status(200).json({
        message: 'Thank you for paying !'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PaymentStatusController