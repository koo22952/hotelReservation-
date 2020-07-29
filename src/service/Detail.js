import React from 'react'
import { bookingRoom } from '../api'
import { format } from 'date-fns'

function withDetail (Component) {
  return class extends React.Component {
    state = {
      romeId: '',
      bookingInfo: {person: '', phone: '', date: []},
      startDate: null,
      endDate: null,
      minDate: null
    }

    fetchBookingRoom = async () => {
      const postData = {
        name: 'HELL',
        tel: '0987654321',
        date: ['2020-08-20', '2020-08-21']
      }
      const id =
        '3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu'

      try {
        const res = await bookingRoom(id, postData)
        console.log(res)
      } catch (err) {
        console.error(err)
      }
    }

    handleDateChange = (val, checkInOut) => {

      const formatDate = format(val, 'yyyy-MM-dd')

      if (checkInOut) {
        this.setState({
          startDate: formatDate,
          minDate: formatDate
        })
      } else {
        this.setState({
          endDate: formatDate
        })
      }
    }

    handleInputChange = (e, type) => {
      const val = e.target.value

      this.setState((prevState) => {
        return {
          bookingInfo: {
            ...prevState.bookingInfo,
            [type]: val
          }
        }
      })
    }

    render () {
      return (
        <Component
          handleInputChange={this.handleInputChange}
          handleDateChange={this.handleDateChange}
          {...this.state}
          {...this.props}
        />
      )
    }
  }
}

export default withDetail

// import Detail from '../views/Detail'

// function withDetail(Component) {
//   return function DetailHoc(props) {
//     return <Component {...props} />
//   }
// }

// 若要在邏輯層引入 view 的檔案做成 HOC，必須記得 router 路徑也需要更改，component 引用路徑調整
// export default withDetail(Detail)

/*
 * routes
 *
 * import Detail from 'service/Detail'
 *
 * {
 *    path: '/detail',
 *    component: Detail,
 *    exact: true,
 * },
 *
 *
 *
 * */
