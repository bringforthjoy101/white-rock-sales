// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Card, CardBody, CardText, Button, Row, Col } from 'reactstrap'
import { Pocket, DollarSign, TrendingUp, User, Check, Star, Flag, Phone } from 'react-feather'
import CardTitle from 'reactstrap/lib/CardTitle'

const UserInfoCard = ({ selectedUser }) => {
  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.avatar) {
      return <img src={selectedUser.avatar} alt='user-avatar' className='img-fluid rounded' height='104' width='104' />
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded'
          content={selectedUser.user_details.names}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px'
          }}
        />
      )
    }
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xl='6' lg='12' className='d-flex flex-column justify-content-between border-container-lg'>
            <div className='user-avatar-section'>
              <div className='d-flex justify-content-start'>
                {renderUserImg()}
                <div className='d-flex flex-column ml-1'>
                  <div className='user-info mt-2'>
                    <h4 className='mb-0'>{selectedUser !== null ? selectedUser.user_details.names : 'Eleanor Aguilar'}</h4>
                    <CardText tag='span'>
                      {selectedUser !== null ? selectedUser.user_details.email : 'eleanor.aguilar@gmail.com'}
                    </CardText>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex align-items-center user-total-numbers'>
              <div className='d-flex align-items-center mr-2'>
                <div className='color-box bg-light-primary'>
                  <Pocket className='text-primary' />
                </div>
                <div className='ml-1'>
                  <h5 className='mb-0'>{selectedUser.user_details.naira_wallet.toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}</h5>
                  <small>Naira Balance</small>
                </div>
              </div>
              <div className='d-flex align-items-center'>
                <div className='color-box bg-light-success'>
                  <Pocket className='text-success' />
                </div>
                <div className='ml-1'>
                  <h5 className='mb-0'>{selectedUser.user_details.appia_coins}</h5>
                  <small>Appia Coin</small>
                </div>
              </div>
            </div>
            <div className="mt-3 mr-5">
              <div className='d-flex flex-wrap justify-content-between align-items-center'>
                <div className='user-info-title'>
                  <User className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    User Id
                  </CardText>
                </div>
                <CardText className='mb-0'>
                  {selectedUser !== null ? selectedUser.user_details.user_id : 'eleanor.aguilar'}
                </CardText>
              </div>
              <div className='d-flex flex-wrap justify-content-between align-items-center my-50'>
                <div className='user-info-title'>
                  <Check className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Status
                  </CardText>
                </div>
                <CardText className='text-capitalize mb-0'>
                  {selectedUser !== null ? selectedUser.user_details.status || 'Active' : 'Active'}
                </CardText>
              </div>
              <div className='d-flex flex-wrap justify-content-between align-items-center my-50'>
                <div className='user-info-title'>
                  <Phone className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Phone No
                  </CardText>
                </div>
                <CardText className='text-capitalize mb-0'>
                  {selectedUser.user_details.phone}
                </CardText>
              </div>
            </div>
          </Col>
          <Col xl='6' lg='12' className='mt-2 mt-xl-0'>
            <div className='user-info-wrapper'>
              {selectedUser?.user_bank_details !== null ? <div className="mt-2">
                <div className='user-info-title'>
                  <CardTitle> Bank Details: </CardTitle>
                </div>
                <div className='d-flex flex-wrap align-items-center mt-0'>
                  <div className='user-info-title'>
                    <User className='mr-1' size={14} />
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Account Name
                </CardText>
                  </div>
                  <CardText className='mb-0'>{selectedUser?.user_bank_details?.account_name}</CardText>
                </div>
                <div className='d-flex flex-wrap align-items-center mt-1'>
                  <div className='user-info-title'>
                    <Flag className='mr-1' size={14} />
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Account Number
                </CardText>
                  </div>
                  <CardText className='mb-0'>{selectedUser?.user_bank_details?.account_number}</CardText>
                </div>
                <div className='d-flex flex-wrap align-items-center mt-1'>
                  <div className='user-info-title'>
                    <Phone className='mr-1' size={14} />
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Bank Name
                </CardText>
                  </div>
                  <CardText className='mb-0'>{selectedUser?.user_bank_details?.bank_name}</CardText>
                </div>
              </div> : ""}
              <div className="mt-2">
                <div className='user-info-title'>
                  <CardTitle> Providus Details: </CardTitle>
                </div>
                <div className='d-flex flex-wrap align-items-center mt-0'>
                  <div className='user-info-title'>
                    <User className='mr-1' size={14} />
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Account Name
                  </CardText>
                  </div>
                  <CardText className='mb-0'>{selectedUser?.user_providus_details?.account_name}</CardText>
                </div>
                <div className='d-flex flex-wrap align-items-center mt-1'>
                  <div className='user-info-title'>
                    <Flag className='mr-1' size={14} />
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Account Number
                  </CardText>
                  </div>
                  <CardText className='mb-0'>{selectedUser?.user_providus_details?.account_number}</CardText>
                </div>
                <div className='d-flex flex-wrap align-items-center mt-1'>
                  <div className='user-info-title'>
                    <Phone className='mr-1' size={14} />
                    <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                      Bank Name
                  </CardText>
                  </div>
                  <CardText className='mb-0'>{selectedUser?.user_providus_details?.bank_name}</CardText>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default UserInfoCard
