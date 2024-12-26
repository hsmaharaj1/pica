import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from 'lucide-react';

export default function FAQ() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "Lorem ipsum dolor sit amet amet",
      answer: "Lorem ipsum dolor sit amet consectetur. Consequat ut ac sagittis pellentesque risus arcu feugiat. Tincidunt lobortis sed sit integer ut in et purus est. Feugiat ut augue luctus sagittis eros. A volutpat ac feugiat natoque in. Aenean cursus dictum egestas convallis enim. Mauris sem feugiat pellentesque hac elementum odio amet. Rhoncus dui diam in non non pharetra amet. Turpis euismod placerat est felis. Morbi tristique tincidunt. Why don't programmers like nature? It has too many bugs. Turpis euismod placerat est felis. Morbi tristique tincidunt."
    },
    {
      id: 2,
      question: "Lorem ipsum dolor sit amet amet",
      answer: "Lorem ipsum dolor sit amet consectetur explanation."
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [editingFaq, setEditingFaq] = useState(null);

  const handleAdd = () => {
    if (editingFaq) {
      setFaqs(faqs.map(faq =>
        faq.id === editingFaq.id
          ? { ...faq, question: newFaq.question, answer: newFaq.answer }
          : faq
      ));
    } else {
      setFaqs([...faqs, { id: Date.now(), ...newFaq }]);
    }
    setIsDialogOpen(false);
    setNewFaq({ question: '', answer: '' });
    setEditingFaq(null);
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setNewFaq({ question: faq.question, answer: faq.answer });
    setIsDialogOpen(true);
  };

  const handleDeleteFAQ = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl text-gray-600 mb-2 font-bold">Frequently Asked Question</h1>
          <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur. Scelerisque.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-[#6E6CDF] hover:bg-[#6261C5]">Add FAQ's</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFaq ? 'Edit FAQ' : 'Add FAQ\'s'}</DialogTitle>
              <DialogDescription>
                Add a new frequently asked question and its answer here.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Heading</label>
                <Input
                  placeholder="Enter Heading"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Enter product description"
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  rows={4}
                />
              </div>
              <Button className="w-full bg-[#6E6CDF] hover:bg-[#6261C5]" onClick={handleAdd}>
                {editingFaq ? 'Update FAQ' : 'Add FAQ\'s'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Accordion type="single" collapsible className="space-y-4 font-poppins">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={`item-${faq.id}`}
            className="border rounded-lg p-4 bg-white"
          >

            <AccordionTrigger className="hover:no-underline">
              <div className="flex justify-between items-center">

                <div className="text-md font-medium mr-6 text-gray-700">{faq.question}</div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(faq);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFAQ(faq.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}