import React, { PropTypes } from 'react'
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export default function PlayButton(props) {
    const { iconText, iconColor, iconName, onPressHandler } = props
    return (
        <TouchableOpacity style={styles.button} onPress={onPressHandler}>
            <Icon name={iconName} size={80} color={iconColor} style={styles.icon} />
            <Text style={styles.iconText}>{iconText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginBottom: 10,
    },
    icon: {
        marginBottom: 15
    },
    iconText: {
        color: '#FFFFFF'
    }
})