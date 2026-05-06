module Courses
  class DeleteCourse
    def initialize(course, current_user)
      @course = course
      @current_user = current_user
    end

    def call
      raise Errors::Forbidden unless @course.creator_id == @current_user.id
      @course.destroy!
    end
  end
end