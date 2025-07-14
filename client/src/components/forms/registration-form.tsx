import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertStudentSchema, type InsertStudent } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const courses = [
  { value: "hiv-counselling", label: "HIV (VCT) Counselling and Testing" },
  { value: "adherence-counselling", label: "Adherence Counselling Certificate" },
  { value: "diploma-counselling", label: "Diploma in Counselling" },
  { value: "primary-guidance", label: "Primary Guidance" },
  { value: "sign-language", label: "Kenya Sign Language" },
  { value: "ecde", label: "ECDE" },
];

export default function RegistrationForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertStudent>({
    resolver: zodResolver(insertStudentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      course: "",
      additionalInfo: "",
    },
  });

  const registrationMutation = useMutation({
    mutationFn: async (data: InsertStudent) => {
      const response = await apiRequest("POST", "/api/students", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Your registration has been submitted successfully. We will contact you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertStudent) => {
    registrationMutation.mutate(data);
  };

  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-college-dark text-center">
          Registration Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course of Interest</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.value} value={course.value}>
                            {course.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Any additional information or questions"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8 text-center">
              <Button
                type="submit"
                className="bg-college-green text-white px-8 py-3 hover:bg-green-600 font-semibold"
                disabled={registrationMutation.isPending}
              >
                {registrationMutation.isPending ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
