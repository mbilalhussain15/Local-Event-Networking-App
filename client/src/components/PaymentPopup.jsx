import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/FontAwesome';
import ArrowBack from 'react-native-vector-icons/MaterialIcons'; 
import { useCreateTicketMutation } from '../redux/slices/api/ticketApiSlice';
import { useCreateInitiatePaymentMutation, useCreateSimulatePaymentMutation } from '../redux/slices/api/paymentApiSlice';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const PaymentPopup = ({event, user, isVisible, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [creditCardDetails, setCreditCardDetails] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const [createTicket] = useCreateTicketMutation();
  const [initiatePayment] = useCreateInitiatePaymentMutation();
  const [simulatePayment] = useCreateSimulatePaymentMutation(); 

  useEffect(() => {
    if (isVisible) {
      setStep(1); 
      setSelectedTicket(null); 
      setPaymentMethod(null); 
      setCreditCardDetails({
        name: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      }); 
    }
  }, [isVisible]);

  useEffect(() => {
    if (step === 1) {
      playSuccessSound();
    }
  }, [step]);

  const playSuccessSound = () => {
    const sound = new Sound(require('../assets/sounds/success.mp3'), (error) => {
      if (error) {
        console.error('Failed to load the sound', error);
        return;
      }
      sound.play(() => {
        sound.release(); 
      });
    });
  };

  const userId= event.user_id;
  const eventId= event._id;
  const handlePayNow = async () => {

    if (paymentMethod === 'CreditCard') {
      const { name, cardNumber, expiryDate, cvv } = creditCardDetails;
      if (!name || !cardNumber || !expiryDate || !cvv) {
        Alert.alert('Error', 'Please fill all credit card details.');
        return;
      }
    }
    setIsLoading(true);
    try {
      
      const ticketData = {
        ticketType: selectedTicket,
        userId,
        eventId,
      };
      const ticketResponse = await createTicket(ticketData).unwrap();

      const ticketId = ticketResponse?.ticket._id;
      const ticketPrice = ticketResponse?.ticket.price;
      if (!ticketId) throw new Error('Failed to create ticket.');
      
      
      const paymentData = {
        paymentMethod,
        userId,
        ticketId,
      };
     
      const paymentResponse = await initiatePayment(paymentData).unwrap();

      if (!paymentResponse?.success) throw new Error('Payment initiation failed.');

     
      const paymentDetails = {
        userId,
        ticketId,
        eventId,
        amount: ticketPrice,
        paymentMethod,
      };
      const simulateResponse = await simulatePayment({paymentDetails}).unwrap();
      setTransactionId(simulateResponse?.transactionId)
      if (!simulateResponse?.success) throw new Error('Payment simulation failed.');

      setStep(4); 

    } catch (error) {
      console.error('Payment process failed:', error);
      Alert.alert('Error', error.data.error || 'An error occurred during payment.');
    }
    finally {
      setIsLoading(false);
    }
  };


  const handleBack = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1); 
    }
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  
  
  const handleConfirm = (date) => {
   
    const month = date.getMonth() + 1; 
    const year = date.getFullYear().toString().slice(-2);
    setExpiryDate(`${month < 10 ? `0${month}` : month}/${year}`);
    hideDatePicker();
  };

  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          
          <View style={styles.stepIndicatorContainer}>
            {['1', '2', '3', '4'].map((item, index) => (
              <React.Fragment key={index}>
                <View
                  style={[
                    styles.stepIndicator,
                    step >= index + 1 && styles.activeStepIndicator,
                  ]}>
                  {step > index + 1 ? (
                    
                    <Icon name="check" size={20} color="white" />
                  ) : (
                   
                    <Text
                      style={[
                        styles.stepText,
                        step === index + 1 && styles.activeStepText,
                      ]}>
                      {item}
                    </Text>
                  )}
                </View>
                {index < 3 && (
                  <View
                    style={[
                      styles.stepLine,
                      step > index + 1 && styles.activeStepLine,
                    ]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          {step === 1 && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          )}
          
          {(step > 1 && step < 4) && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowBack style={styles.backButtonText} name="arrow-back" size={24} fontWeight="bold" />
            </TouchableOpacity>

          )}
          {step === 1 && (
            <>
              <Text style={styles.title}>Choose Ticket</Text>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedTicket === 'Standard' && styles.selectedOption,
                ]}
                onPress={() => setSelectedTicket('Standard')}>
                <Text>Standard Ticket 50€</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedTicket === 'VIP' && styles.selectedOption,
                ]}
                onPress={() => setSelectedTicket('VIP')}>
                <Text>VIP Ticket 100€</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => selectedTicket && setStep(2)}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          )}
          {step === 2 && (
            <>
              <Text style={styles.title}>Payment Method</Text>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  paymentMethod === 'Paypal' && styles.selectedOption,
                ]}
                onPress={() => setPaymentMethod('Paypal')}>
                <Text>PayPal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  paymentMethod === 'Stripe' && styles.selectedOption,
                ]}
                onPress={() => setPaymentMethod('Stripe')}>
                <Text>Stripe</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  paymentMethod === 'CreditCard' && styles.selectedOption,
                ]}
                onPress={() => setPaymentMethod('CreditCard')}>
                <Text>Credit Card</Text>
              </TouchableOpacity>
              {paymentMethod === 'CreditCard' && (
       <View style={styles.creditCardInput}>
       <TextInput
         placeholder="Card Holder Name"
         style={styles.input}
         value={creditCardDetails.name}
         onChangeText={(text) => {
           const filteredText = text.replace(/[^a-zA-Z\s]/g, ''); 
           if (filteredText !== text) {
             Alert.alert('Name should only contain alphabets.');
           }
           setCreditCardDetails({ ...creditCardDetails, name: filteredText });
         }}
       />
     
       <TextInput
         placeholder="Card Number"
         style={styles.input}
         keyboardType="numeric"
         value={creditCardDetails.cardNumber}
         onChangeText={(text) => {
           const filteredText = text.replace(/[^0-9]/g, ''); 
           if (filteredText !== text) {
             Alert.alert('Card number should only contain digits.');
           }
           setCreditCardDetails({ ...creditCardDetails, cardNumber: filteredText });
         }}
         maxLength={16} 
       />
     
     <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          placeholder="Expiry Date (MM/YY)"
          style={styles.dateInput}
          value={expiryDate}
          editable={false} 
        />
      </TouchableOpacity>

      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()} 
        maximumDate={new Date(2099, 11, 31)} 
        is24Hour={false} 
        display="spinner" 
      />

     
       <TextInput
         placeholder="CVV"
         style={styles.input}
         keyboardType="numeric"
         value={creditCardDetails.cvv}
         onChangeText={(text) => {
           const filteredText = text.replace(/[^0-9]/g, ''); 
           if (filteredText !== text) {
             Alert.alert('CVV should only contain digits.');
           }
           setCreditCardDetails({ ...creditCardDetails, cvv: filteredText });
         }}
         maxLength={4} 
       />
     
       <Text style={styles.priceText}>Price: {selectedTicket === 'Standard' && '50€'}
                  {selectedTicket === 'VIP' && '100€'}
                  {!['Standard', 'VIP'].includes(selectedTicket)}</Text>
     </View>
     
        
              )}
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => paymentMethod && setStep(3)}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          )}
          {step === 3 && (
            
            <View style={styles.paymentDetailsContainer}>
              <Text style={styles.paymentTitle}>Confirm Your Payment</Text>
              <View style={styles.paymentInfoRow}>
                <Text style={styles.paymentlabel}>User Name:</Text>
                <Text style={styles.paymentvalue}>{user.firstName} {user.lastName}</Text>
              </View>
              <View style={styles.paymentInfoRow}>
                <Text style={styles.paymentlabel}>Event Name:</Text>
                <Text style={styles.paymentvalue}>{event.eventName}</Text>
              </View>
              <View style={styles.paymentInfoRow}>
                <Text style={styles.paymentlabel}>Ticket Type:</Text>
                <Text style={styles.paymentvalue}>{selectedTicket}</Text>
              </View>
              <View style={styles.paymentInfoRow}>
                <Text style={styles.paymentlabel}>Payment Method:</Text>
                <Text style={styles.paymentvalue}>{paymentMethod}</Text>
              </View>
              <View style={styles.dividerLine} />
              <View style={styles.paymentInfoRow}>
              <Text style={styles.paymentlabel}>Amount:</Text>
                <Text style={styles.paymentvalue}>
                  {selectedTicket === 'Standard' && '50€'}
                  {selectedTicket === 'VIP' && '100€'}
                  {!['Standard', 'VIP'].includes(selectedTicket)}
                </Text>
              </View>
              <TouchableOpacity onPress={handlePayNow} style={styles.nextButton}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Pay Now</Text>
              )}
            </TouchableOpacity>
            </View>
          )}
          {step === 4 && (
            <>
              <Text style={styles.title}>Payment Successful</Text>
              <View style={styles.paymentInfoRow}>
                <Text style={styles.paymentlabel}>Transaction ID:</Text>
                <Text style={styles.paymentvalue}>{transactionId}</Text>
              </View>
              <Text style={styles.successMessage}>
                Congratulations! You will receive your ticket via email.
              </Text>
              <TouchableOpacity style={styles.bottomCloseButton} onPress={onClose}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    position: 'relative', 
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    marginTop:40
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#ccc',
    alignSelf: 'center',
  },
  activeStepLine: {
    backgroundColor: '#5C3BE7',
  },
  checkMark: {
  fontSize: 20,
  color: 'white',
  
},

  
  stepIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepIndicator: {
    borderColor: '#5C3BE7',
    backgroundColor: '#5C3BE7',
  },
  stepText: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  activeStepText: {
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1,

  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5C3BE7',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 5,
    zIndex: 1,
    color: '#5C3BE7',
   
  },
  backButtonText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#5C3BE7',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#e6e6e6',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  creditCardInput:{
    width: '90%',
  },
  priceText: {
    fontSize: 16,
    marginVertical: 10,
  },
  successMessage: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#5C3BE7',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    width:'100%',
    borderRadius: 20,

  },
  bottomCloseButton: {
    marginTop: 20,
    backgroundColor: '#5C3BE7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  paymentDetailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  paymentlabel: {
    fontWeight: 'bold',
  },
  paymentvalue: {
    color: '#555',
    
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#ccc', 
    marginVertical: 10,
    width: '100%',
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default PaymentPopup;