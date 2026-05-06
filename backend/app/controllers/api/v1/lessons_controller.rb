module Api
  module V1
    class LessonsController < ApplicationController
      before_action :set_course

      def index
        lessons = @course.lessons.by_status(params[:status]).order(created_at: :desc)

        render json: lessons.as_json(
          only: [:id, :title, :status, :video_url]
        )
      end

      def create
        lesson = Lessons::CreateLesson.new(@course, lesson_params, current_user).call
        render json: lesson.as_json(
          only: [:id, :title, :status, :video_url]
        ), status: :created
      end

      def update
        lesson = @course.lessons.find(params[:id])
        updated = Lessons::UpdateLesson.new(lesson, lesson_params, current_user).call
        render json: updated.as_json(
          only: [:id, :title, :status, :video_url]
        )
      end

      def destroy
        lesson = @course.lessons.find(params[:id])
        Lessons::DeleteLesson.new(lesson, current_user).call
        head :no_content
      end

      private

      def set_course
        @course = Course.find(params[:course_id])
      end

      def lesson_params
        params.require(:lesson).permit(:title, :status, :video_url)
      end
    end
  end
end