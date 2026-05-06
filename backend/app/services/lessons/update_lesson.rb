module Lessons
  class UpdateLesson
    def initialize(lesson, params, current_user)
      @lesson = lesson
      @params = params
      @current_user = current_user
    end

    def call
      raise Errors::Forbidden unless @lesson.course.creator_id == @current_user.id
      @lesson.update!(@params)
      @lesson
    end
  end
end