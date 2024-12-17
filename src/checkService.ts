import { ServiceValidator } from './services/openai/diagnostics/serviceValidator';

async function validateService() {
  console.log('Validating OpenAI service configuration...\n');
  
  const validator = new ServiceValidator();
  const isValid = await validator.validateOpenAIService();
  
  if (isValid) {
    console.log('✅ OpenAI service is properly configured');
  } else {
    console.log('❌ OpenAI service validation failed');
    process.exit(1);
  }
}

validateService().catch(error => {
  console.error('Validation failed:', error);
  process.exit(1);
});