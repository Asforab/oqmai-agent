import { AssistantStatusChecker } from './services/openai/diagnostics/AssistantStatusChecker';
import { ASSISTANT_CONFIG } from './services/openai/config/constants';

async function checkAssistants() {
  console.log('Checking assistants status...\n');
  
  const statusChecker = new AssistantStatusChecker();
  const results = await statusChecker.checkAllAssistants();
  
  console.log('Results:');
  console.log('---------');
  
  for (const [name, status] of Object.entries(results)) {
    const assistantId = ASSISTANT_CONFIG[name as keyof typeof ASSISTANT_CONFIG].ID;
    console.log(`${name}:`);
    console.log(`  ID: ${assistantId}`);
    console.log(`  Status: ${status ? '✅ Online' : '❌ Offline'}`);
    console.log();
  }
}

checkAssistants().catch(console.error);