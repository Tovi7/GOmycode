import tkinter as tk

class ShoppingCartApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Shopping Cart")

        self.items = {"Item 1": 10.0, "Item 2": 15.0, "Item 3": 20.0}
        self.cart = {}

        self.create_widgets()

    def create_widgets(self):
        self.item_listbox = tk.Listbox(self.root, selectmode=tk.SINGLE)
        for item in self.items:
            self.item_listbox.insert(tk.END, item)
        self.item_listbox.pack(pady=10)

        self.quantity_label = tk.Label(self.root, text="Quantity:")
        self.quantity_label.pack()

        self.quantity_var = tk.StringVar()
        self.quantity_entry = tk.Entry(self.root, textvariable=self.quantity_var)
        self.quantity_entry.pack()

        self.add_button = tk.Button(self.root, text="Add", command=self.add_to_cart)
        self.add_button.pack(pady=5)

        self.remove_button = tk.Button(self.root, text="Remove", command=self.remove_from_cart)
        self.remove_button.pack(pady=5)

        self.like_button = tk.Button(self.root, text="Like ❤️", command=self.like_item)
        self.like_button.pack(pady=5)

        self.total_label = tk.Label(self.root, text="Total: $0.0")
        self.total_label.pack()

    def add_to_cart(self):
        selected_index = self.item_listbox.curselection()
        if selected_index:
            selected_item = self.item_listbox.get(selected_index)
            quantity = int(self.quantity_var.get()) if self.quantity_var.get().isdigit() else 1
            self.cart[selected_item] = self.cart.get(selected_item, 0) + quantity
            self.update_total()

    def remove_from_cart(self):
        selected_index = self.item_listbox.curselection()
        if selected_index:
            selected_item = self.item_listbox.get(selected_index)
            if selected_item in self.cart:
                del self.cart[selected_item]
                self.update_total()

    def like_item(self):
        selected_index = self.item_listbox.curselection()
        if selected_index:
            selected_item = self.item_listbox.get(selected_index)
            if selected_item in self.cart:
                # Toggle like status
                self.cart[selected_item] = -self.cart[selected_item]
                self.update_total()

    def update_total(self):
        total_price = sum(self.items[item] * quantity if quantity > 0 else 0 for item, quantity in self.cart.items())
        self.total_label.config(text=f"Total: ${total_price:.2f}")

if __name__ == "__main__":
    root = tk.Tk()
    app = ShoppingCartApp(root)
    root.mainloop()
