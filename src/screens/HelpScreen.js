import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpScreen({ navigation }) {
  const faqs = [
    { q: 'How do I place an order?', a: 'Browse restaurants, add items to cart, and checkout with your preferred payment method.' },
    { q: 'What are the delivery charges?', a: 'Delivery charges vary by restaurant and distance. Typically ranges from ₹10-₹40.' },
    { q: 'How can I track my order?', a: 'Go to Orders tab to see real-time status of your current and past orders.' },
    { q: 'How to cancel an order?', a: 'You can cancel within 2 minutes of placing. Go to Orders → Select order → Cancel.' },
    { q: 'Payment methods accepted?', a: 'We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery.' },
  ];

  const [expanded, setExpanded] = React.useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" translucent={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Help & Support</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Contact */}
        <View style={styles.contactSection}>
          <TouchableOpacity style={styles.contactCard}>
            <View style={[styles.contactIcon, { backgroundColor: 'rgba(96,165,250,0.12)' }]}>
              <Ionicons name="chatbubbles-outline" size={22} color="#60a5fa" />
            </View>
            <Text style={styles.contactLabel}>Live Chat</Text>
            <Text style={styles.contactSub}>Available 24/7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactCard}>
            <View style={[styles.contactIcon, { backgroundColor: 'rgba(74,222,128,0.12)' }]}>
              <Ionicons name="call-outline" size={22} color="#4ade80" />
            </View>
            <Text style={styles.contactLabel}>Call Us</Text>
            <Text style={styles.contactSub}>9 AM - 9 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactCard}>
            <View style={[styles.contactIcon, { backgroundColor: 'rgba(251,191,36,0.12)' }]}>
              <Ionicons name="mail-outline" size={22} color="#fbbf24" />
            </View>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactSub}>24h response</Text>
          </TouchableOpacity>
        </View>

        {/* FAQs */}
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqCard}
            onPress={() => setExpanded(expanded === index ? null : index)}
            activeOpacity={0.8}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{faq.q}</Text>
              <Ionicons
                name={expanded === index ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="rgba(255,255,255,0.4)"
              />
            </View>
            {expanded === index && (
              <Text style={styles.faqAnswer}>{faq.a}</Text>
            )}
          </TouchableOpacity>
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 10, paddingHorizontal: 20, paddingBottom: 16, gap: 14,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '700', color: '#fff' },
  content: { paddingHorizontal: 20 },
  contactSection: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  contactCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14, padding: 14, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  contactIcon: {
    width: 44, height: 44, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  contactLabel: { color: '#fff', fontSize: 13, fontWeight: '600', marginBottom: 2 },
  contactSub: { color: 'rgba(255,255,255,0.35)', fontSize: 11 },
  faqTitle: {
    fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 14,
  },
  faqCard: {
    backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 14,
    padding: 16, marginBottom: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  faqHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  faqQuestion: { flex: 1, color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '600' },
  faqAnswer: {
    color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 20,
    marginTop: 10, paddingTop: 10,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)',
  },
});
