from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration
import torch


class BlenderBot:
    def __init__(self, model_name="facebook/blenderbot-400M-distill"):
        self.tokenizer = BlenderbotTokenizer.from_pretrained(model_name)
        self.model = BlenderbotForConditionalGeneration.from_pretrained(model_name)
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model.to(self.device)

    def get_response(self, user_input):
        # Encode the user's input
        input_ids = self.tokenizer([user_input], return_tensors="pt", truncation=True, max_length=512).input_ids.to(self.device)

        # Generate a response from the model
        with torch.no_grad():
            response_ids = self.model.generate(input_ids, max_length=512, num_return_sequences=1)

        # Decode the response
        response = self.tokenizer.decode(response_ids[0], skip_special_tokens=True)

        return response