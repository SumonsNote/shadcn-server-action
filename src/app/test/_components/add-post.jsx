"use client";
import { addComment } from "@/app/actions/blog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CourseComment({ postId }) {
  const [comment, setComment] = useState("Some Comment");

  return (
    <Button
      onClick={async () => {
        const added = await addComment(comment, postId);
      }}
    >
      Add Comment
    </Button>
  );
}
