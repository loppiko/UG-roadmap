import React from 'react'
import PropTypes from 'prop-types'
import trashIcon from '../media/icons/trash-icon.svg'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.message
 * @param {() => void} props.handleExit
 * @param {() => void} props.deleteCallback
 * @returns {JSX.Element}
 */
function DeleteModal ({ title, message, handleExit, deleteCallback }) {
  return (
        <div className="delete-modal-background">
            <div className="delete-modal">
                <div className="delete-modal-upper">
                    <div className="delete-modal-upper-left">
                        <img className="delete-modal-upper-left-icon" src={trashIcon} alt="trash-icon" />
                    </div>
                    <div className="delete-modal-upper-right">
                        <div className="delete-modal-upper-right-title">{title}</div>
                        <div className="delete-modal-upper-right-message">{message}</div>
                    </div>
                </div>
                <div className="delete-modal-lower">
                    <button className="delete-modal-cancel-button" onClick={handleExit}>Cancel</button>
                    <button className="delete-modal-delete-button" onClick={deleteCallback}>Delete</button>
                </div>
            </div>
        </div>
  )
}

DeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleExit: PropTypes.func.isRequired,
  deleteCallback: PropTypes.func.isRequired
}

export default DeleteModal
