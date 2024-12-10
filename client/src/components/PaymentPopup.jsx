import React, { useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Sound from 'react-native-sound';

const PaymentPopup = ({ isVisible, onClose, ticketPrice }) => {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [creditCardDetails, setCreditCardDetails] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (isVisible) {
      setStep(1); // Reset to the first step whenever the popup is reopened
      setSelectedTicket(null); // Clear the selected ticket
      setPaymentMethod(null); // Clear the payment method
      setCreditCardDetails({
        name: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      }); // Clear credit card details
    }
  }, [isVisible]);

  useEffect(() => {
    if (step === 3) {
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
        sound.release(); // Release the sound instance after playback
      });
    });
  };

  const handlePayNow = () => {
    if (paymentMethod === 'creditCard') {
      const { name, cardNumber, expiryDate, cvv } = creditCardDetails;
      if (!name || !cardNumber || !expiryDate || !cvv) {
        Alert.alert('Error', 'Please fill all credit card details.');
        return;
      }
    }
    setStep(3); // Proceed to the success message
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1); // Go back to the previous step
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          {/* Close (X) Button */}
          {step === 1 && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          )}
          {/* Back Arrow */}
          {step > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}
          {step === 1 && (
            <>
              <Text style={styles.title}>Choose Ticket</Text>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedTicket === 'standard' && styles.selectedOption,
                ]}
                onPress={() => setSelectedTicket('standard')}>
                <Text>Standard Ticket</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedTicket === 'vip' && styles.selectedOption,
                ]}
                onPress={() => setSelectedTicket('vip')}>
                <Text>VIP Ticket</Text>
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
              <Text style={styles.title}>Payment Details</Text>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  paymentMethod === 'paypal' && styles.selectedOption,
                ]}
                onPress={() => setPaymentMethod('paypal')}>
                <Text>PayPal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  paymentMethod === 'creditCard' && styles.selectedOption,
                ]}
                onPress={() => setPaymentMethod('creditCard')}>
                <Text>Credit Card</Text>
              </TouchableOpacity>
              {paymentMethod === 'creditCard' && (
                <View>
                  <TextInput
                    placeholder="Name"
                    style={styles.input}
                    onChangeText={(text) =>
                      setCreditCardDetails({ ...creditCardDetails, name: text })
                    }
                  />
                  <TextInput
                    placeholder="Card Number"
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setCreditCardDetails({ ...creditCardDetails, cardNumber: text })
                    }
                  />
                  <TextInput
                    placeholder="Expiry Date (MM/YY)"
                    style={styles.input}
                    onChangeText={(text) =>
                      setCreditCardDetails({ ...creditCardDetails, expiryDate: text })
                    }
                  />
                  <TextInput
                    placeholder="CVV"
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setCreditCardDetails({ ...creditCardDetails, cvv: text })
                    }
                  />
                  <Text style={styles.priceText}>Price: ${ticketPrice}</Text>
                </View>
              )}
              <TouchableOpacity style={styles.nextButton} onPress={handlePayNow}>
                <Text style={styles.buttonText}>Pay Now</Text>
              </TouchableOpacity>
            </>
          )}
          {step === 3 && (
            <>
              <Text style={styles.title}>Payment Successful</Text>
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
    position: 'relative', // Allow positioning of buttons
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
  },
  backButtonText: {
    fontSize: 24,
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
  },
  bottomCloseButton: {
    marginTop: 20,
    backgroundColor: '#5C3BE7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentPopup;
