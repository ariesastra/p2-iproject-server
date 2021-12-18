const { verifyToken } = require('../helper/jwt')
const { Post, Organization, PaymentStatus, Profile } = require('../models')

const postAuthorization = async (req, res, next) => {
  const { id: UserId } = req.auth
  const { id } = req.params

  try {
    const cekPost = await Post.findOne({
      where: {
        id
      }
    }) 
    if ( !cekPost ) throw { name: "NOT_FOUND" }

    const cekOwner = await Post.findOne({
      where: {
        id, 
        UserId
      }
    })
    if ( !cekOwner ) throw { name: "FORBIDDEN" }

    next()
  } catch (error) {
    next(error)
  }
}

const profileCheck = async (req, res, next) => {
  const { id: UserId } = req.auth

  try {
    const cekProfile = await Profile.findOne({
      where: {
        UserId
      }
    })
    if ( cekProfile ) throw { name: "FORBIDDEN" }

    next()
  } catch (error) {
    next(error)
  }
}

const organizationAuthor = async (req, res, next) => {
  const { id } = req.params
  const { id: UserId} = req.auth
  try {
    const cekOrganization = await Organization.findOne({
      where: {
        id
      }
    })
    if ( !cekOrganization ) throw { name: "NOT_FOUND" }

    const cekOwner = await Organization.findOne({
      where: {
        id,
        UserId
      }
    })
    if ( !cekOwner ) throw { name: "FORBIDDEN" }

    next()
  } catch (error) {
    next(error)
  }
}

const paymentAuthor = async (req, res, next) => {
  const { id: UserId } = req.auth
  const { OrganizationId } = req.body
  
  try {
    const cekOwner = await Organization.findOne({
      where: {
        id: OrganizationId,
        UserId
      }
    })
    if ( !cekOwner) throw { name: "FORBIDDEN" }

    next()
  } catch (error) {
    next(error)
  }
}

const getPaymentDetails = async (req, res, next) => {
  const { id: UserId } = req.auth
  
  try {
    const cekDetails = await PaymentStatus.findAll({
      where: {
        UserId
      }
    })
    if ( cekDetails < 1 ) throw { name: "FORBIDDEN" }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postAuthorization, 
  organizationAuthor, 
  paymentAuthor,
  getPaymentDetails,
  profileCheck
}