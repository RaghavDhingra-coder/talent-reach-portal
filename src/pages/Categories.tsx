
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Building, Code, LineChart, Microscope, Pencil, ShoppingCart, Users } from "lucide-react";
import { mockCategories } from "@/data/mockData";

// Extended category data with icons and descriptions
const extendedCategories = [
  { 
    id: "tech", 
    name: "Technology",
    description: "Software development, IT services, hardware, data science, and more.",
    icon: Code,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  { 
    id: "design", 
    name: "Design",
    description: "UI/UX design, graphic design, product design, and more.",
    icon: Pencil,
    color: "text-purple-600", 
    bgColor: "bg-purple-100",
  },
  { 
    id: "marketing", 
    name: "Marketing",
    description: "Digital marketing, content creation, SEO, social media, and more.",
    icon: LineChart,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  { 
    id: "sales", 
    name: "Sales",
    description: "Sales representatives, account executives, business development, and more.",
    icon: ShoppingCart,
    color: "text-orange-600",
    bgColor: "bg-orange-100", 
  },
  { 
    id: "finance", 
    name: "Finance",
    description: "Accounting, financial analysis, banking, investment, and more.",
    icon: Building,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
  { 
    id: "healthcare", 
    name: "Healthcare",
    description: "Medicine, nursing, pharmacy, health tech, and more.",
    icon: Microscope,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  { 
    id: "education", 
    name: "Education",
    description: "Teaching, training, education technology, curriculum development, and more.",
    icon: Users,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100", 
  },
];

const Categories = () => {
  // Merge count data from mockCategories with extended information
  const categoriesWithCounts = extendedCategories.map(cat => {
    const matchingCat = mockCategories.find(c => c.id === cat.id);
    return {
      ...cat,
      count: matchingCat?.count || 0
    };
  });
  
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-muted">
        <div className="container py-8">
          <h1 className="text-2xl font-bold md:text-3xl">Job Categories</h1>
          <p className="mt-2 text-muted-foreground">
            Browse jobs by industry and category
          </p>
        </div>
      </section>
      
      <div className="container py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categoriesWithCounts.map((category) => (
            <Card key={category.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`rounded-full p-3 ${category.bgColor}`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <div>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.count} jobs available</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to={`/jobs?category=${category.id}`}>
                    Browse {category.name} Jobs
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
