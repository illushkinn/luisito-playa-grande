import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "..", "public", "images", "menu");
const COMFYUI_API = "http://127.0.0.1:8188";

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const MENU_ITEMS = [
  { id: "milanesa-napolitana", prompt: "Milanesa Napolitana breaded veal cutlet with tomato sauce melted mozzarella and ham on a rustic wooden table, warm ambient lighting, depth of field, mouth-watering food photography", category: "platos" },
  { id: "milanesa-fugazzeta", prompt: "Milanesa Fugazzeta breaded veal cutlet covered in melted mozzarella cheese and grilled onions on rustic table, warm lighting, food photography", category: "platos" },
  { id: "milanesa-clasica", prompt: "Classic breaded veal milanesa cutlet golden crispy fried served with lemon wedges on wooden table, rustic food photography", category: "platos" },
  { id: "lomo-completo", prompt: "Argentinian lomo completo steak sandwich with ham cheese lettuce tomato and fried egg on crusty bread, rustic table", category: "platos" },
  { id: "hamburguesa-completa", prompt: "Juicy Argentinian hamburguesa completa with lettuce tomato cheese ham fried egg on bun, rustic table, food photography", category: "platos" },
  { id: "papas-fritas", prompt: "Crispy golden french fries in a rustic wooden bowl, coarse salt, warm lighting, mouth-watering food photography", category: "platos" },
  { id: "pizza-muzzarella", prompt: "Argentinian pizza muzzarella with melted mozzarella cheese and olives on a rustic wooden surface, warm pizzeria lighting", category: "pizzas" },
  { id: "pizza-napolitana", prompt: "Pizza napolitana with tomato sauce mozzarella sliced tomatoes and oregano on rustic table, warm lighting", category: "pizzas" },
  { id: "pizza-fugazzeta", prompt: "Pizza fugazzeta covered in melted mozzarella and grilled onions on rustic wooden board, food photography", category: "pizzas" },
  { id: "pizza-especial", prompt: "Pizza especial with ham bell peppers olives and melted cheese on rustic wooden board, food photography", category: "pizzas" },
  { id: "pizza-calabresa", prompt: "Pizza calabresa with sliced Calabrian sausage peppers and mozzarella on rustic wooden table, warm lighting", category: "pizzas" },
  { id: "empanada-carne", prompt: "Three golden baked Argentinian beef empanadas on a rustic wooden board, flaky crust, warm lighting, food photography", category: "empanadas" },
  { id: "empanada-pollo", prompt: "Golden baked chicken empanadas on rustic wooden board, flaky pastry crust, warm lighting, food photography", category: "empanadas" },
  { id: "empanada-jyq", prompt: "Golden baked ham and cheese empanadas on rustic wooden board, flaky crust, melted cheese, food photography", category: "empanadas" },
  { id: "empanada-verdura", prompt: "Golden baked spinach and cheese empanadas on rustic wooden board, flaky crust, warm lighting", category: "empanadas" },
  { id: "empanada-caprese", prompt: "Golden baked caprese empanadas with tomato basil and mozzarella on rustic wooden board, food photography", category: "empanadas" },
  { id: "tarta-verdura", prompt: "Argentinian spinach and cheese tart slice with golden flaky crust on rustic wooden board, warm lighting, food photography", category: "tartas" },
  { id: "tarta-pollo", prompt: "Chicken tart slice with golden flaky crust and creamy filling on rustic wooden board, food photography", category: "tartas" },
  { id: "tarta-jyq", prompt: "Ham and cheese tart slice with golden flaky crust on rustic wooden board, warm lighting, food photography", category: "tartas" },
  { id: "tarta-calabaza", prompt: "Pumpkin tart slice with golden flaky crust on rustic wooden board, warm autumn lighting, food photography", category: "tartas" },
  { id: "pollo-entero", prompt: "Whole roasted golden chicken on a rustic wooden platter, crispy skin, herbs, warm lighting, food photography", category: "pollo-rostizado" },
  { id: "pollo-medio", prompt: "Half roasted chicken golden crispy skin on rustic wooden board, herbs, warm lighting, food photography", category: "pollo-rostizado" },
  { id: "pollo-con-papas", prompt: "Roasted chicken with golden roasted potatoes on rustic wooden platter, herbs, warm lighting", category: "pollo-rostizado" },
  { id: "suprema-pollo", prompt: "Grilled chicken suprema breast with herbs on rustic wooden board, warm lighting, food photography", category: "pollo-rostizado" },
  { id: "coca-cola", prompt: "Ice cold Coca-Cola glass bottle with condensation drops on rustic wooden table, warm ambient lighting", category: "bebidas" },
  { id: "coca-cola-light", prompt: "Ice cold Coca-Cola Light glass bottle with condensation on rustic wooden table, warm lighting", category: "bebidas" },
  { id: "agua-mineral", prompt: "Crystal clear mineral water bottle with glass of water on rustic wooden table, fresh and clean", category: "bebidas" },
  { id: "cerveza-quilmes", prompt: "Ice cold Quilmes beer bottle with frosty glass mug on rustic wooden table, pub lighting", category: "bebidas" },
  { id: "cerveza-stella", prompt: "Ice cold Stella Artois beer bottle with frosted glass on rustic wooden table, warm pub lighting", category: "bebidas" },
  { id: "flan-con-dulce", prompt: "Argentinian flan caramel dessert with dulce de leche on rustic wooden table, warm lighting, food photography", category: "postres" },
  { id: "budin-de-pan", prompt: "Argentinian bread pudding slice on rustic wooden plate, caramel sauce, warm lighting, food photography", category: "postres" },
  { id: "ensalada-frutas", prompt: "Fresh fruit salad in a rustic ceramic bowl, fresh strawberries kiwi orange, vibrant colors, food photography", category: "postres" },
  { id: "helado-dos-sabores", prompt: "Two scoops artisan ice cream in a rustic ceramic cup, creamy texture, warm lighting, food photography", category: "postres" },
];

async function generateImage(item, workflowTemplate) {
  const positivePrompt = `professional food photography, ${item.prompt}, soft natural window lighting, shallow depth of field, rustic warm tones, 8k highly detailed, mouth-watering, wooden rustic surface, dark warm background`;

  const workflow = structuredClone(workflowTemplate);
  workflow["6"].inputs.text = positivePrompt;

  const resp = await fetch(`${COMFYUI_API}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: workflow }),
  });
  const data = await resp.json();
  const promptId = data.prompt_id;
  console.log(`[${item.id}] Queued: ${promptId}`);

  let status;
  do {
    await new Promise((r) => setTimeout(r, 3000));
    const statusResp = await fetch(`${COMFYUI_API}/history/${promptId}`);
    status = await statusResp.json();
  } while (!status[promptId]?.outputs);

  const outputs = status[promptId].outputs;
  const nodeId = Object.keys(outputs).find((k) => outputs[k].images);
  if (!nodeId) throw new Error("No image output found");

  const imageInfo = outputs[nodeId].images[0];
  const imgResp = await fetch(`${COMFYUI_API}/view?filename=${imageInfo.filename}&subfolder=${imageInfo.subfolder}&type=${imageInfo.type}`);
  const imgBuffer = Buffer.from(await imgResp.arrayBuffer());

  const filename = `${item.id}.webp`;
  writeFileSync(resolve(OUTPUT_DIR, filename), imgBuffer);
  console.log(`[${item.id}] Saved: ${filename} (${(imgBuffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  console.log("Starting menu image generation...\n");

  const workflowResp = await fetch(`${COMFYUI_API}/object_info`);
  if (!workflowResp.ok) {
    console.error("ComfyUI not running. Start it first.");
    process.exit(1);
  }

  const workflowTemplate = {
    "3": { class_type: "KSampler", inputs: { seed: 42, steps: 20, cfg: 7, sampler_name: "euler", scheduler: "normal", denoise: 1, model: ["4", 0], positive: ["6", 0], negative: ["7", 0], latent_image: ["5", 0] } },
    "4": { class_type: "CheckpointLoaderSimple", inputs: { ckpt_name: "v1-5-pruned-emaonly.safetensors" } },
    "5": { class_type: "EmptyLatentImage", inputs: { width: 512, height: 512, batch_size: 1 } },
    "6": { class_type: "CLIPTextEncode", inputs: { text: "", clip: ["4", 1] } },
    "7": { class_type: "CLIPTextEncode", inputs: { text: "blurry, low quality, low resolution, ugly, bad composition, distorted, dark, overexposed", clip: ["4", 1] } },
    "8": { class_type: "VAEDecode", inputs: { samples: ["3", 0], vae: ["4", 2] } },
    "9": { class_type: "SaveImage", inputs: { filename_prefix: "comfy", images: ["8", 0] } },
  };

  for (const item of MENU_ITEMS) {
    try {
      await generateImage(item, workflowTemplate);
      console.log("");
    } catch (err) {
      console.error(`[${item.id}] Failed:`, err.message);
    }
  }

  console.log("All done!");
}

main();
