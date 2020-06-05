import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
    id: number;
    sigla: string;
    nome: string;
}

interface IBGECityResponse {
    id: number;
    nome: string;
}

const Home = () => {
    const [selectedUF, setSelectedUF] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [ufs, setUFs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
            setUFs(response.data.map(uf => uf.sigla));
        });
    }, []);

    useEffect(() => {
        if (selectedUF === '0') {
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(response => {
            setCities(response.data.map(city => city.nome));
        });
    }, [selectedUF]);

    function handleNavigationToPoints() {
        console.log(selectedUF);
        console.log(selectedCity);
        if (!selectedUF) {
            Alert.alert('Campo obrigatório', 'Selecione uma UF para continuar.');
            return;
        }

        if (!selectedCity) {
            Alert.alert('Campo obrigatório', 'Selecione uma Cidade para continuar.');
            return;
        }

        navigation.navigate('Points', { selectedUF, selectedCity });
    }

    function handleSelectUF(selectedUF: string) {
        setSelectedUF(selectedUF);
    }

    function handleSelectCity(selectedCity: string) {
        setSelectedCity(selectedCity);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground source={require('../../assets/home-background.png')} imageStyle={{ width: 274, height: 368 }} style={styles.container}>
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
                    <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                </View>
                <View style={styles.footer}>
                    <RNPickerSelect style={pickerStyle} placeholder={{ label: 'Selecione uma UF', value: null }}
                        onValueChange={(value) => handleSelectUF(value)}
                        items={ufs.map(uf => ({ label: uf, value: uf }))} />
                    <RNPickerSelect style={pickerStyle} placeholder={{ label: 'Selecione uma Cidade', value: null }}
                        onValueChange={(value) => handleSelectCity(value)}
                        items={cities.map(city => ({ label: city, value: city }))} />
                    <RectButton style={styles.button} onPress={handleNavigationToPoints}>
                        <View style={styles.buttonIcon}>
                            <Text><Icon name="arrow-right" color="#FFF" size={24}></Icon></Text>
                        </View>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const pickerStyle = {
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 30,
        paddingRight: 30,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        color: 'black',
        marginBottom: 10,
    },
    inputAndroid: {
        color: 'white',
    },
    placeholderColor: 'black',
    underline: { borderTopWidth: 1 },
    icon: {

    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

export default Home;