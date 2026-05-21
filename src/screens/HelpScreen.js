import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function HelpScreen({ navigation }) {
  const { theme } = useTheme();
  const faqs = [
    { q: 'How do I place an order?', a: 'Browse restaurants, add items to cart, and checkout with your preferred payment method.' },
    { q: 'What are the delivery charges?', a: 'Delivery charges vary by restaurant and distance. Typically ranges from ₹10-₹40.' },
    { q: 'How can I track my order?', a: 'Go to Orders tab to see real-time status of your current and past orders.' },
    { q: 'How to cancel an order?', a: 'You can cancel within 2 minutes of placing. Go to Orders → Select order → Cancel.' },
    { q: 'Payment methods accepted?', a: 'We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery.' },
  ];

  const [expanded, setExpanded] = React.useState(null);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.statusBarBg} translucent={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { backgroundColor: theme.iconBg }]}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Help & Support</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Contact */}
        <View style={styles.contactSection}>
          <TouchableOpacity style={[styles.contactCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <View style={[styles.contactIcon, { backgroundColor: 'rgba(96,165,250,0.12)' }]}>
              <Ionicons name="chatbubbles-outline" size={22} color="#60a5fa" />
            </View>
            <Text style={[styles.contactLabel, { color: theme.text }]}>Live Chat</Text>
            <Text style={[styles.contactSub, { color: theme.textMuted }]}>Available 24/7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <View style={[styles.contactIcon, { backgroundColor: 'rgba(74,222,128,0.12)' }]}>
              <Ionicons name="call-outline" size={22} color="#4ade80" />
            </View>
            <Text style={[styles.contactLabel, { color: theme.text }]}>Call Us</Text>
            <Text style={[styles.contactSub, { color: theme.textMuted }]}>9 AM - 9 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <View style={[styles.contactIcon, { backgroundColor: 'rgba(251,191,36,0.12)' }]}>
              <Ionicons name="mail-outline" size={22} color="#fbbf24" />
            </View>
            <Text style={[styles.contactLabel, { color: theme.text }]}>Email</Text>
            <Text style={[styles.contactSub, { color: theme.textMuted }]}>24h response</Text>
          </TouchableOpacity>
        </View>

        {/* FAQs */}
        <Text style={[styles.faqTitle, { color: theme.text }]}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.faqCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
            onPress={() => setExpanded(expanded === index ? null : index)}
            activeOpacity={0.8}
          >
            <View style={styles.faqHeader}>
              <Text style={[styles.faqQuestion, { color: theme.text }]}>{faq.q}</Text>
              <Ionicons
                name={expanded === index ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={theme.textMuted}
              />
            </View>
            {expanded === index && (
              <Text style={[styles.faqAnswer, { color: theme.textSecondary, borderTopColor: theme.divider }]}>{faq.a}</Text>
            )}
          </TouchableOpacity>
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 10, paddingHorizontal: 20, paddingBottom: 16, gap: 14,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '700' },
  content: { paddingHorizontal: 20 },
  contactSection: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  contactCard: {
    flex: 1, borderRadius: 14, padding: 14,
    alignItems: 'center', borderWidth: 1,
  },
  contactIcon: {
    width: 44, height: 44, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  contactLabel: { fontSize: 13, fontWeight: '600', marginBottom: 2 },
  contactSub: { fontSize: 11 },
  faqTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  faqCard: {
    borderRadius: 14, padding: 16, marginBottom: 8, borderWidth: 1,
  },
  faqHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  faqQuestion: { flex: 1, fontSize: 14, fontWeight: '600' },
  faqAnswer: {
    fontSize: 13, lineHeight: 20,
    marginTop: 10, paddingTop: 10, borderTopWidth: 1,
  },
});
