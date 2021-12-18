const organizaiton = require('express').Router()
const OrganizationController = require('../controller/OrganizationController')
const { organizationAuthor, profileCheck } = require('../middleware/authorization')

organizaiton.get('/', OrganizationController.getOrganization)
organizaiton.post('/', profileCheck, OrganizationController.postOrganization)
organizaiton.put('/update/:id', 
  organizationAuthor,
  OrganizationController.putOrganization
)
organizaiton.delete('/delete/:id', 
  organizationAuthor,  
  OrganizationController.deleteOrganization
)

module.exports = organizaiton