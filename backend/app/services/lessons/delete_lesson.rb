module Lessons
  class DeleteLesson
    def initialize(lesson, current_user)
      @lesson = lesson
      @current_user = current_user
    end

    def call
      raise Errors::Forbidden unless @lesson.course.creator_id == @current_user.id
      @lesson.destroy!
    end
  end
end