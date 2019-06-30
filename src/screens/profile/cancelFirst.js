import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Alert,
} from 'react-native'

import ClosableGroupTitle from '@components/profile/closableGroupTitle'
import { FontAwesome } from '@expo/vector-icons'
import Color from '@common/color'
import { hotel_primary } from '@common/image'
import RoundButton from '@components/general/roundButton'
import moment from 'moment';
import { BOOKING_DETAIL } from '@store/cart/actionTypes';
import Marquee from '@components/general/react-native-text-ticker'
import Global from "@utils/global";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartAction from '@store/cart';
import { Actions } from 'react-native-router-flux';
import UtilService from '@utils/utils';

const { T1, T2 } = Global.Translate

const Item = ({ title, value }) => (
    <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.delimiter}>:</Text>
        <Text style={styles.itemValue}>{value}</Text>
    </View>
)

const NoTitleItem = ({value})=>(
    <View style={styles.itemContainer}>
        <FontAwesome name="circle" size={5} color={Color.primary} style={{width:10}}/>
        <Text style={styles.itemValue}>{value}</Text>
    </View>
)

export default class CancelFist extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
           
        }
    }
    sendRequest(){

    }

    renderTravellers() {
        let {bookDetail, item} = this.props
        let businessObject = bookDetail.businessObject
        let travellerDetails = bookDetail.travellerDetails

        if(item.businessID == 1) { //Hotel
            let item  = travellerDetails[0]
            return (
                <View>
                    <Marquee style={styles.groupTitleText}>Lead Guest details</Marquee>
                    <View key={index} style={styles.groupContent}>
                        <Item title="Name" value={item.details.userDisplayName} />
                        <Item title="Age" value={item.age} />
                        <Item title="Gender" value={item.details.genderDesc} />
                    </View>
                </View>
                )
        } else if(item.businessID == 5) {
            return travellerDetails.map((item, index) => {
                return (
                    <View key={index} style={styles.groupTitleContainer}>
                        <Marquee style={styles.groupTitleText}>Traveler Information</Marquee>
                        <View key={index} style={styles.groupContent}>
                            <Text style={styles.guestTitle}>Customer{index + 1}</Text>
                            <Item title="Name" value={item.details.firstName + ' ' + item.details.lastName} />
                            <Item title="Age" value={item.age} />
                            <Item title="Gender" value={item.details.genderDesc} />
                            {UtilService.isDefined(item.details.address) && <Item title="Address" value={item.details.address} />}
                            {UtilService.isDefined(item.details.location.city) && <Item title="City" value={item.details.location.city} />}
                            {UtilService.isDefined(item.details.contactInformation.actlFormatPhoneNumber) && <Item title="Cell Phone" value={item.details.contactInformation.actlFormatPhoneNumber} />}
                        </View>
                    </View>
                    )
            })
        }
        
        return travellerDetails.map((item, index) => {
            return (
                <View key={index} style={styles.groupContent}>
                    <Text style={styles.guestTitle}>Guest{index + 1}</Text>
                    <Item title="Name" value={item.details.userDisplayName} />
                    <Item title="Age" value={item.age} />
                    <Item title="Gender" value={item.details.genderDesc} />
                </View>)
        }) 
    }

    renderFeatures() {
        let {bookDetail, item} = this.props
        let businessObject = bookDetail.businessObject
        let travellerDetails = bookDetail.travellerDetails

        if(item.businessID == 1) return null
        if(item.businessID == 5) {
            return (
            <View>
                <View style={styles.groupTitleContainer}>
                    <Marquee style={styles.groupTitleText}>Operator Details</Marquee>
                </View>
                <View style={styles.groupContent}>
                    {bookDetail.businessObject.tpExtension.map((item, index)=>(
                        <Item key={index} title={UtilService.capitalizeFirstLetter(UtilService.startCaseWithoutUppercase(item.key))} value={item.value}/>
                    ))}
                </View>
            </View>)
        }

        return (
            <View>
                <View style={styles.groupTitleContainer}>
                    <Marquee style={styles.groupTitleText}>Dubai - Dubai Airport(DXB) to Riyah - King Khaid Airport</Marquee>
                </View>
                <View style={styles.groupContent}>
                    <Item title="Operated by" value={'National Air Services dba FLYNAS'} />
                    <Item title="Flight" value={'202'} />
                    <Item title="Class" value={'Economic Standard(M)'} />
                    <Item title="Depart" value={'10/12/2018 11:00 PM'} />
                    <Item title="Arrive" value={'10/12/2018 11:00 PM'} />
                </View>
            </View>
        )
    }
    render() {
        let {bookDetail, item} = this.props
        let businessObject = bookDetail.businessObject
        let travellerDetails = bookDetail.travellerDetails
        
        return (
            <ScrollView>
                <View style={styles.groupTitleContainer}>
                    <Marquee style={styles.groupTitleText}>Reservation Details</Marquee>
                </View>
                <View style={styles.groupContent}>
                    <Item title="Booking\nReference\nNumber" value={bookDetail.bookingRefNo} />
                    <Item title="Status" value={bookDetail.bookingStatus} />
                    <Item title="Booking Date" value={moment(bookDetail.bookingDate).format('DD-MM-YYYY HH:MM')} />
                    <Item title="Itinerary Number" value={bookDetail.itineraryRefNo} />
                    <Item title="Itinerary Name" value={bookDetail.itineraryName} />
                    {/* <Item title="Class" value={'Economic Standard(M)'} /> */}
                    <View style={styles.itemContainer}>
                        <Text style={[styles.linkText, {flex:1}]}>Booking Terms</Text>

                        <Text style={[styles.linkText, {flex:2}]}>Terms & Conditions</Text>
                    </View>
                </View>

                {/* <View style={styles.groupTitleContainer}>
                    <Marquee style={styles.groupTitleText}>{UtilService.capitalizeFirstLetter(bookDetail.businessObject.business)}</Marquee>
                </View>
                <View style={styles.groupContent}>
                    <NoTitleItem value='One Way ticket' />
                    <NoTitleItem value='AllFlight times are local to each city' />
                    <NoTitleItem value='Seat assignment at airport check-in desk only' />
                </View> */}
                {this.renderFeatures()}
                {this.renderTravellers()}

                <View style={styles.groupTitleContainer}>
                    <Marquee style={styles.groupTitleText}>Price Details</Marquee>
                </View>
                <View style={styles.groupContent}>
                    {businessObject.displayRateInfo.map((item, index) =>
                        <Item key={index} title={item.description} value={item.currencyCode + ' ' + item.amount} />)}
                    <RoundButton
                        title="Cancel Request"
                        onPress={() => Actions.CancelSecond({bookDetail, item})}
                        textStyle={styles.buttonText}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 5,
    },
    itemTitle: {
        fontSize: 12,
        color: Color.text,
        flex: 1
    },
    delimiter: {
        fontSize: 12,
        color: Color.text,
    },
    itemValue: {
        color: Color.primary,
        fontSize: 12,
        flex: 2,
        marginLeft: 20
    },
    groupTitleContainer: {
        backgroundColor: Color.lightBack,
        borderTopColor: Color.border,
        borderTopWidth: 0.5,
        justifyContent: 'center',
        paddingHorizontal: 15,
        height: 40
    },
    groupTitleText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Color.lightText
    },
    buttonText: {
        fontWeight: 'bold'
    },
    groupContent:{
        padding:15,
        backgroundColor: 'white'
    },
    linkText:{
        color: Color.orange,
        fontSize: 12,
    }
})