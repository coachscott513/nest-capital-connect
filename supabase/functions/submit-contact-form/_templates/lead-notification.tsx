import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Row,
  Column,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface LeadNotificationEmailProps {
  name: string
  email: string
  phone?: string
  message?: string
  type: string
  location?: string
  bedrooms?: string
  price_range?: string
}

export const LeadNotificationEmail = ({
  name,
  email,
  phone,
  message,
  type,
  location,
  bedrooms,
  price_range,
}: LeadNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>New {type} lead from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🎉 New Lead Received!</Heading>
        
        <Text style={text}>
          You have a new <strong>{type}</strong> lead from your website:
        </Text>

        <Section style={section}>
          <Row>
            <Column style={labelColumn}>
              <Text style={label}>Name:</Text>
            </Column>
            <Column style={valueColumn}>
              <Text style={value}>{name}</Text>
            </Column>
          </Row>
          
          <Row>
            <Column style={labelColumn}>
              <Text style={label}>Email:</Text>
            </Column>
            <Column style={valueColumn}>
              <Link href={`mailto:${email}`} style={link}>{email}</Link>
            </Column>
          </Row>
          
          {phone && (
            <Row>
              <Column style={labelColumn}>
                <Text style={label}>Phone:</Text>
              </Column>
              <Column style={valueColumn}>
                <Link href={`tel:${phone}`} style={link}>{phone}</Link>
              </Column>
            </Row>
          )}
          
          <Row>
            <Column style={labelColumn}>
              <Text style={label}>Lead Type:</Text>
            </Column>
            <Column style={valueColumn}>
              <Text style={value}>{type}</Text>
            </Column>
          </Row>
          
          {location && (
            <Row>
              <Column style={labelColumn}>
                <Text style={label}>Location:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{location}</Text>
              </Column>
            </Row>
          )}
          
          {bedrooms && (
            <Row>
              <Column style={labelColumn}>
                <Text style={label}>Bedrooms:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{bedrooms}</Text>
              </Column>
            </Row>
          )}
          
          {price_range && (
            <Row>
              <Column style={labelColumn}>
                <Text style={label}>Price Range:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{price_range}</Text>
              </Column>
            </Row>
          )}
          
          {message && (
            <Row>
              <Column style={labelColumn}>
                <Text style={label}>Message:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{message}</Text>
              </Column>
            </Row>
          )}
        </Section>

        <Section style={buttonContainer}>
          <Link href={`mailto:${email}?subject=Re: Your ${type} inquiry`} style={button}>
            Reply to Lead
          </Link>
        </Section>

        <Text style={footer}>
          This lead was submitted through your Capital District Real Estate website.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default LeadNotificationEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 8px',
}

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  margin: '20px 0',
}

const labelColumn = {
  width: '30%',
  paddingRight: '12px',
}

const valueColumn = {
  width: '70%',
}

const label = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '8px 0',
}

const value = {
  color: '#333',
  fontSize: '14px',
  margin: '8px 0',
}

const link = {
  color: '#2754C5',
  textDecoration: 'underline',
  fontSize: '14px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#2754C5',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  width: '200px',
  padding: '14px 7px',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
  margin: '20px 0',
}