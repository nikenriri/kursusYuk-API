const role = require('./constants/role')
const permission = require('./constants/permission')

module.exports = {
  [role.ADMINISTRATOR]: [
    permission.BROWSE_PRODUCTS,
    permission.READ_PRODUCT,
    permission.EDIT_PRODUCT,
    permission.ADD_PRODUCT,
    permission.DELETE_PRODUCT,

    permission.BROWSE_ORDERS,
    permission.READ_ORDER,
    permission.EDIT_ORDER,
    permission.DELETE_ORDER
  ],

  [role.CUSTOMER]: [
    permission.BROWSE_PRODUCTS,
    permission.READ_PRODUCT,

    permission.BROWSE_ORDERS,
    permission.READ_ORDER,
    permission.ADD_ORDER,

    permission.ADD_TO_CART,
    permission.VIEW_CART
  ]
}