import React from "react";

interface HeroSectionProps {
  todos_completed: number;
  total_todos: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ todos_completed, total_todos }) => {
  return (
    <section className="todohero_section mb-5">
      <div>
        <p className="text_large">Task Done</p>
        <p className="text_small">Keep it up</p>
      </div>
      <div>
        {todos_completed}/{total_todos}
      </div>
    </section>
  );
};

export default HeroSection;
